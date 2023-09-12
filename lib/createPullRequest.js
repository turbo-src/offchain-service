const { PullRequest, Repo } = require("../server/db");

async function createPullRequest(
  /*owner:*/ owner,
  /*repo_id:*/ repo_id,
  /*defaultHash:*/ defaultHash,
  /*childDefaultHash:*/ childDefaultHash,
  head,
  branchDefaultHash,
  remoteURL,
  /*baseBranch:*/ baseBranch,
  /*fork_branch:*/ fork_branch,
  /*title:*/ title,
  issue_id
) {
  try {
    const repo = await Repo.findOne({ where: { repo_id: repo_id }, include: PullRequest });
    const json = JSON.stringify(repo, 2, null);
    const repoObject = JSON.parse(json);
    const pullRequests = repoObject?.pullrequests;

    //Check if repo has a pull request with the same defaultHash already
    if(pullRequests !== []){
    for(let i = 0; i < pullRequests?.length; i++){
      if(pullRequests[i].defaultHash === defaultHash) {
        return 403
      }
    }
  }

  let pr = await PullRequest.create({
      issue_id: issue_id,
      defaultHash: defaultHash,
      childDefaultHash: childDefaultHash,
      title: title,
      repo_id: repo_id,
      head: head,
      branchDefaultHash: branchDefaultHash,
      remoteURL: remoteURL,
      baseBranch: baseBranch,
      fork_branch: fork_branch,
    });

    await repo.addPullrequest(pr.id);

    return 201;
  } catch (error) {
    console.log(error);
    return error;
  }
}
module.exports = createPullRequest;
