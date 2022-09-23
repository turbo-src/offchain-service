const { PullRequest } = require("../server/db");
const getPullRequest = require("./getPullRequest");

async function getMostRecentLinkedPullRequest(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*defaultHash:*/ defaultHash,
  /*contributor:*/ contributor_id,
  /*side:*/ side
) {
  try {
    let pr = await getPullRequest(owner, repo_id, defaultHash, contributor_id, side)
    console.log('pr.state = ' + pr.state)
    console.log('pr.fork_branch = ' + pr.fork_branch)
    if (pr.defaultHash !== pr.childDefaultHash) {
      const prChild = await getPullRequest(owner, repo_id, pr.childDefaultHash, contributor_id, side)
      if (prChild.status === 200) {
	await getMostRecentLinkedPullRequest(owner, repo_id, pr.childDefaultHash, contributor_id, side)
      } else {
	return pr
      }
    }
    return pr
  } catch (error) {
    console.log(error);
   return { 
	    status: 500,
	    state: "",
	    repo_id: repo_id,
	    fork_branch: "",
	    defaultHash: "",
	    childDefaultHash: ""
          }
  }
}
module.exports = getMostRecentLinkedPullRequest;
