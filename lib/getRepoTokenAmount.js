const { Repo } = require("../server/db");
async function getRepoTokenAmount(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*pr_id:*/ pr_id,
  /*contributor:*/ contributor,
  /*side:*/ side
) {
  try {
    let repo = await Repo.findOne({ where: { repo_id: repo_id } });
    return repo.tokenAmount;
  } catch (error) {
    console.log(error);
    return error;
  }
}
module.exports = getRepoTokenAmount;
