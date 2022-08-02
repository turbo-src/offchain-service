const { Repo, Contributor } = require("../server/db");

async function getAuthorizedContributor(
  /*owner:*/ owner,
  /*repo_id:*/ repo_id,
  /*pr_id:*/ pr_id,
  /*contributor_id:*/ contributor_id,
  /*side:*/ side
) {
  try {
    const repo = await Repo.findOne({
      where: { repo_id: repo_id },
      include: {
        model: Contributor,
      },
    });

    //Get association table Contributors data
    let data = JSON.stringify(repo, null, 2);
    data = JSON.parse(data);
    let contributors = data.contributors;

    let res = false;

    for (let i = 0; i < contributors.length; i++) {
      if (contributors[i].contributor_id === contributor_id) {
        res = true;
        break;
      }
    }

    return res;
  } catch (error) {
    `There was an error: ${error}`;
  }
}

module.exports = getAuthorizedContributor;
