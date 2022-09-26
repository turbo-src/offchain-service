const { Repo, PullRequest } = require("../server/db");

async function getRepo(/*repo:*/ repo_id) {
  try {
    const repo = await Repo.findOne({
      where: {
        repo_id: repo_id,
      },
    });
    return {
      repo_id: repo.repo_id,
      owner: repo.owner,
      contributor_id: repo.contributor_id,
      head: repo.head,
      quorum: repo.quorum,
    };
  } catch (error) {
    console.log(error);
    return 500;
  }
}

module.exports = getRepo;
