const { PullRequest } = require("../../server/db");

async function getPRvoteTotals(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*pr_id:*/ pr_id,
  /*contributor:*/ contributor_id,
  /*side:*/ side
) {
  try {
    let pullRequest = await PullRequest.findOne({
      where: { pr_id: pr_id, repo_id: repo_id },
    });

    const totalVotedTokens =
      Number(pullRequest.yesTokenAmount) + Number(pullRequest.noTokenAmount);

    const res = totalVotedTokens / 1000000;

    return String(res);
  } catch (error) {
    console.log(error);
    return error;
  }
}
module.exports = getPRvoteTotals;
