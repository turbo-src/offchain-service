const { Repo } = require("../server/db");
const createPullRequest = require("./createPullRequest")
const fetch = require("cross-fetch")
async function createRepo(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*defaultHash:*/ defaultHash,
  /*contributor:*/ contributor_id,
  /*side:*/ side
) {
  try {
    await Repo.create({
      owner: owner,
      repo_id: repo_id,
      contributor_id: contributor_id,
    });

  fetch(`https://api.github.com/repos/${repo_id}/pulls`)
  .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  })
  .then(data => {
    data.map(async (pull) => {
      await createPullRequest(
        repo_id.split('_')[0],
        repo_id,
        pull.head.sha,
        pull.head.sha,
        pull.head.sha,
        pull.head.sha,
        pull.url,
        pull.base.ref,
        pull.head.ref,
        pull.title,
        `issue_${pull.number}`,
        )
    })
  })
  .catch(err => {
    console.error(err);
  });
    
    console.log(`created repo ${repo_id} successfully!`);
    return 201;
  } catch (error) {
    console.log(error);
    return 403;
  }
}

module.exports = createRepo;
