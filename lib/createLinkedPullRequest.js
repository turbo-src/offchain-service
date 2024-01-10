const { PullRequest, Repo, Vote } = require("../server/db");

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
  /*title:*/ title
) {
  try {
    const parentPullRequest = await PullRequest.findOne({
      where: { defaultHash: parentDefaultHash, repo_id: repo_id },
      include: { model: Vote },
    });

    // This PR inherits the parent's vote amounts.
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
      issue_id: parentPullRequest.issue_id,
    });

    const repo = await Repo.findOne({ where: { repo_id: repo_id } });

    await repo.addPullrequest(pr.id);

    await PullRequest.update(
      {
        state: parentPullRequest.state,
        yesTokenAmount: parentPullRequest.yesTokenAmount,
        noTokenAmount: parentPullRequest.noTokenAmount,
      },
      { where: { id: pr.id } }
    );

    return 201;
  } catch (error) {
    console.log(error);
    return error;
  }
}
module.exports = createLinkedPullRequest;
