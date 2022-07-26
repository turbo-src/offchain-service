const { Octokit, App } = require("octokit");
const fsPromises = require("fs").promises;
const fs = require("fs").promises;
var path = require("path");

async function getGithubToken() {
  const data = await fsPromises
    .readFile(path.resolve(__dirname, "../../.config.json"))
    .catch((err) => console.error("Failed to read file", err));

  let json = JSON.parse(data);
  let user = json.github.user;
  let apiToken = json.github.apiToken;
  if (apiToken === undefined) {
    throw new Error("Failed to load Github user " + user + "'s api key.");
  } else {
    console.log("Successfully read Github " + user + "'s api key.");
  }

  return apiToken;
}

const gitHubUtil = {
  getPullRequest: async function (owner, repo, pull) {
    let token = await getGithubToken();

    const octokit = new Octokit({ auth: token });

    const res = await octokit.request(
      `GET /repos/${owner}/${repo}/pulls/${pull}`
    ); //, {

    //await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
    //  owner: 'octocat',
    //  repo: 'hello-world',
    //  pull_number: 42
    //})
    //console.log(res)

    const data = res.data;
    const head = data.head;
    const oid = head.sha;
    const label = head.label.split(":");
    const contributor = label[0];
    const forkBranch = label[1];
    console.log(label);

    return { oid, contributor, forkBranch };
  },
  createPullRequest: async function (owner, repo, forkBranch, pull, title) {
    let token = await getGithubToken();
    const octokit = new Octokit({ auth: token });

    await octokit.request(`POST /repos/${owner}/${repo}/pulls`, {
      owner: owner,
      repo: repo,
      title: title,
      body: "auto pull request",
      head: forkBranch,
      base: "master",
    });
  },
  closePullRequest: async function (owner, repo, pull) {
    let token = await getGithubToken();
    const octokit = new Octokit({ auth: token });

    await octokit.request(`PATCH /repos/${owner}/${repo}/pulls/${pull}`, {
      state: "closed",
      //base: 'master'
    });
    //await octokit.request('PATCH /repos/{owner}/{repo}/pulls/{pull_number}', {
    //  owner: 'octocat',
    //  repo: 'hello-world',
    //  pull_number: 42,
    //  title: 'title'
    //})
  },
  mergePullRequest: async function (owner, repo, pull) {
    let token = await getGithubToken();
    const octokit = new Octokit({ auth: token });

    await octokit.request(
      `PUT /repos/${owner}/${repo}/pulls/${pull}/merge` //{
      //owner: 'octocat',
      //repo: 'hello-world',
      //pull_number: 42,
      //commit_title: 'commit_title'
      //}
    );
  },
  fork: async function (owner, repo, org) {
    let token = await getGithubToken();
    const octokit = new Octokit({ auth: token });

    //await octokit.rest.repos.createFork({owner, repo, org})
    await octokit.rest.repos.createFork({ owner, repo });

    //await octokit.request(`PUT /repos/${owner}/${repo}/fork`, {
    //  organization: org,
    //  //repo: 'hello-world',
    //  //pull_number: 42,
    //  //commit_title: 'commit_title'
    //})

    console.log("gh 116`");
  },
};

module.exports = gitHubUtil;
