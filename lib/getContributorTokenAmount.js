import { Repo, Token } from "../db/index.js";
import sequelize from "/usr/local/node_modules/sequelize/lib/index.js";
// const { Op } = require("/usr/local/node_modules/sequelize/lib/index.js");
export default async function getContributorTokenAmount(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*pr_id:*/ pr_id,
  /*contributor_id:*/ contributor_id,
  /*side:*/ side
) {
  try {
    const record = await Token.findAll({
      where: {
        [sequelize.Op.or]: [{ to: contributor_id }, { from: contributor_id }],
        repo_id: repo_id,
      },
    });
    let data = JSON.stringify(record, 2, null);
    console.log("calc", JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
}
