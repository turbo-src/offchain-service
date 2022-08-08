const { Repo } = require("../../server/db");

async function getRepoStatus(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*pr_id:*/ pr_id,
  /*contributor:*/ contributor_id,
  /*side:*/ side
) {
  try {
    const repo = await Repo.findOne({ where: { repo_id: repo_id } });
    if (repo) {
      return 200;
    } else {
      return 404;
    }
  } catch (error) {
    return 404;
  }
}

module.exports = getRepoStatus;
