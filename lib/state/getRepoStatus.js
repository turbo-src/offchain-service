const { Repo } = require("../../server/db");

async function getRepoStatus(repo_id) {
  try {
    const repo = await Repo.findOne({ where: { repo_id: repo_id } });
    console.log("REPO_ID", repo_id, repo);
    if (repo) {
      return 200;
    } else {
      return 404;
    }
  } catch (error) {
    console.log(error);
    return 404;
  }
}

module.exports = getRepoStatus;
