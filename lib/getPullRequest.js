const { PullRequest } = require("../server/db");

async function getPullRequest(
  /*repo:*/ repo_id,
  /*pr_id:*/ pr_id,
) {
  try {
    const pr = await PullRequest.findOne({
      where: { repo_id: repo_id, pr_id: pr_id },
    });
    console.log('pr.state = ' + pr.state)
  
    return {
      status: 200,
      pr_id: pr.pr_id,
      title: pr.title,
      repo_id: pr.repo_id,
      state: pr.state,
      defaultHash: pr.defaultHash,
      childDefaultHash: pr.childDefaultHash,
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      pr_id: pr_id,
      title: "title",
      repo_id: repo_id,
      state: "state",
      defaultHash: "defaultHash",
      childDefaultHash: "childDefaultHash",
    }
  }
}
module.exports = getPullRequest;
