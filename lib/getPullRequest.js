const { PullRequest } = require("../server/db");

async function getPullRequest(
  /*repo:*/ repo_id,
  /*defaultHash:*/ defaultHash,
) {
  try {
    const pr = await PullRequest.findOne({
      where: { repo_id: repo_id, defaultHash: defaultHash },
    });
    console.log('pr.state = ' + pr.state)
  
    return {
      status: 200,
      defaultHash: pr.defaultHash,
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
      defaultHash: defaultHash,
      title: "title",
      repo_id: repo_id,
      state: "state",
      defaultHash: "defaultHash",
      childDefaultHash: "childDefaultHash",
    }
  }
}
module.exports = getPullRequest;
