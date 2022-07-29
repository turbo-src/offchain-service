import { Repo, Token } from "../server/db/index.js";
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
    const record = await Token.findAll(
      {
        where: {
          [sequelize.Op.or]: [{ to: contributor_id }, { from: contributor_id }],
          repo_id: repo_id,
        },
      },
      { order: ["createdAt", "ASC"] }
    );

    let res = JSON.stringify(record, 2, null);
    let data = JSON.parse(res);

    //A user's token balance is calculated by subtracting their withdrawls
    //(transfer to column) from their deposits (transfer from)
    let bal = data.reduce((accum, cur) => {
      if (cur.to === contributor_id) {
        accum = Number(accum) + Number(cur.amount);
      } else if (cur.from === contributor_id) {
        accum = Number(accum) - Number(cur.amount);
      }
      return accum;
    }, "0");

    return bal;
  } catch (error) {
    console.log(error);
  }
}
