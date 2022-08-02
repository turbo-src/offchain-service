const { PullRequest } = require("../../server/db");
async function getVoteStatus(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*pr_id:*/ pr_id,
  /*contributor:*/ contributor_id,
  /*side:*/ side
) {
  try {
    const pr = await PullRequest.findOne({
      where: { repo_id: repo_id, pr_id: pr_id },
    });
    return pr.status;
  } catch (error) {
    return error;
  }
}
module.exports = getVoteStatus;
