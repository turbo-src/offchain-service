const { PullRequest, Repo } = require("../server/db");

async function updatePullRequest(
  /*repo_id:*/ repo_id,
  /*defaultHash:*/ defaultHash,
  /*childDefaultHash:*/ childDefaultHash
) {
  try {
    let pullRequest = await PullRequest.findOne({
      where: { defaultHash: defaultHash, repo_id: repo_id },
    });
    await pullRequest.update(
      { childDefaultHash: childDefaultHash }
    );
    return 201;
  } catch (error) {
    console.log(error);
    return 500
  }
}
module.exports = updatePullRequest;
