const { Repo } = require("../../server/db");

async function getRepoStatus(repo_id) {
  try {
    const repo = await Repo.findOne({ where: { repo_id: repo_id } });
    if (repo) {
      console.log(`getRepoStatus called privateStore: ${repo_id} = true`);
      return true;
    } else {
      console.log(`getRepoStatus called privateStore: ${repo_id} = false`);
      return false;
    }
  } catch (error) {
    console.log("getRepoStatus Error:", error);
    return 404;
  }
}

module.exports = getRepoStatus;
