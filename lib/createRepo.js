const { Contributor, Repo } = require("../server/db");
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

    const creator = await Contributor.findOne({
      where: { contributor_id: contributor_id },
    });

    await repo.addContributor(creator.id);

    return 201;
  } catch (error) {
    return error;
  }
}

module.exports = createRepo;
