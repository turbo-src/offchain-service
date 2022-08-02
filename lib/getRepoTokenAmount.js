const { Repo } = require("../server/db");
async function getRepoTokenAmount(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*pr_id:*/ pr_id,
  /*contributor:*/ contributor,
  /*side:*/ side
) {
  let repo = await Repo.findOne({ where: { repo_id: repo_id } });
  return repo.tokenAmount;
}
module.exports = getRepoTokenAmount;
