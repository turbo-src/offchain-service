const { Repo } = require("../../server/db");

async function getRepoStatus(/*repo_id:*/ repo_id) {
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
