import { PullRequest, Repo } from "../db/index.js";

export default async function createPullRequest(
  /*owner:*/ owner,
  /*repo:*/ repo,
  /*fork_branch:*/ fork_branch,
  /*pr_id:*/ pr_id,
  /*title:*/ title
) {
  try {
    let pr = await PullRequest.create({
      pr_id: pr_id,
      title: title,
    });
    const repo = await Repo.findOne({ where: { repo_id: repo } });
    await repo.addPullRequest(pr.id);
    return `pull request: ${pr_id} successfully added to repo: ${repo.repo_id}`;
  } catch (error) {
    return error;
  }
}
