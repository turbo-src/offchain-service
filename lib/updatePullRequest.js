const { PullRequest, Repo } = require("../server/db");

async function updatePullRequest(
  /*repo_id:*/ repo_id,
  /*pr_id:*/ pr_id,
  /*childDefaultHash:*/ childDefaultHash
) {
  try {
    let pullRequest = await PullRequest.findOne({
      where: { pr_id: pr_id, repo_id: repo_id },
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
