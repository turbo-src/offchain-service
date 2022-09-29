const { PullRequest, Repo } = require("../server/db");

async function createLinkedPullRequest(
  /*owner:*/ owner,
  /*repo_id:*/ repo_id,
  parentDefaultHash,
  /*defaultHash:*/ defaultHash,
  /*childDefaultHash:*/ childDefaultHash,
  head,
  branchDefaultHash,
  remoteURL,
  /*baseBranch:*/ baseBranch,
  /*fork_branch:*/ fork_branch,
  /*title:*/ title,
) {
  try {
    let pr = await PullRequest.create({
      parentDefaultHash: parentDefaultHash,
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
    const repo = await Repo.findOne({ where: { repo_id: repo_id } });

    await repo.addPullrequest(pr.id);

    // This PR inherits the parent's vote amounts.
    const parentPullRequest = await PullRequest.findOne({
      where: { defaultHash: parentDefaultHash, repo_id: repo_id },
    });

    await parentPullRequest.update({
      yesTokenAmount: parentPullRequest.yesTokenAmount,
      where: { id: parentPullRequest.id },
    });

    await parentPullRequest.update({
      noTokenAmount: parentPullRequest.noTokenAmount,
      where: { id: parentPullRequest.id },
    });

    return 201;
  } catch (error) {
    console.log(error);
    return error;
  }
}
module.exports = createLinkedPullRequest;
