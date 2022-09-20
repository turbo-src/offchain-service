const { PullRequest } = require("../server/db");

async function getPRvoteStatus(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*pr_id:*/ pr_id,
  /*contributor:*/ contributor_id,
  /*side:*/ side
) {
  try {
    let pr = await PullRequest.findOne({
      where: { repo_id: repo_id, pr_id: pr_id },
    });
    console.log('pr.state = ' + pr.state)
    return { status: 200, state: pr.state }
  } catch (error) {
    console.log(error);
   return { status: 500, state: 0 }
  }
}
module.exports = getPRvoteStatus;
