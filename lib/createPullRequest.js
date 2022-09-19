const { PullRequest, Repo } = require("../server/db");

async function createPullRequest(
  /*owner:*/ owner,
  /*repo_id:*/ repo_id,
  /*fork_branch:*/ fork_branch,
  /*pr_id:*/ pr_id,
  /*title:*/ title,
  /*defaultHash:*/ defaultHash,
  /*childDefaultHash:*/ childDefaultHash
) {
  try {
    let pr = await PullRequest.create({
      pr_id: pr_id,
      title: title,
      repo_id: repo_id,
      fork_branch: fork_branch,
      defaultHash: defaultHash,
      childDefaultHash: childDefaultHash
    });
    const repo = await Repo.findOne({ where: { repo_id: repo_id } });

    await repo.addPullrequest(pr.id);

    return 201;
  } catch (error) {
    console.log(error);
    return error;
  }
}
module.exports = createPullRequest;
