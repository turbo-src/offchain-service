const { Repo } = require("../server/db");

async function createRepo(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*pr_id:*/ pr_id,
  /*contributor:*/ contributor_id,
  /*side:*/ side
) {
  try {
    const repo = await Repo.create({
      owner: owner,
      repo_id: repo_id,
      contributor_id: contributor_id,
    });

    return 201;
  } catch (error) {
    console.log(error);
    return 403;
  }
}

module.exports = createRepo;
