const { PullRequest } = require("../../server/db");

async function getPRvoteTotals(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*defaultHash:*/ defaultHash,
  /*contributor:*/ contributor_id,
  /*side:*/ side
) {
  try {
    let pullRequest = await PullRequest.findOne({
      where: { defaultHash: defaultHash, repo_id: repo_id },
    });
    console.log('getPrvotetotals pullRequest =>', pullRequest)
    console.log('getprvotetotals repo_id=>', repo_id)
    console.log('defaulthash getprvotetotals ', defaultHash)

    
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
