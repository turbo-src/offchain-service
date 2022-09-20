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
    if (pr.state === 'open') {
      return { status: 200, state: 0 }
    } else if (pr.state === 'close') {
      return { status: 200, state: 1 }
    } else if (pr.state === 'merge') {
      return { status: 200, state: 2 }
    } else {
      return { status: 200, state: 3 }
    }
  } catch (error) {
    console.log(error);
   return { status: 500, state: 0 }
  }
}
module.exports = getPRvoteStatus;
