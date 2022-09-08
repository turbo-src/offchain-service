const { PullRequest } = require("../../server/db");

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
    if (pr.status === 'open') {
      return { status: 200, type: 0 }
    } else if (pr.status === 'close') {
      return { status: 200, type: 1 }
    } else if (pr.status === 'merge') {
      return { status: 200, type: 2 }
    } else {
      return { status: 200, type: 3 }
    }
  } catch (error) {
    console.log(error);
   return { status: 500, type: 0 }
  }
}
module.exports = getPRvoteStatus;
