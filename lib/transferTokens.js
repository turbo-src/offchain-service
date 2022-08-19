const { Token } = require("../server/db");
const { postGetContributorTokenAmount } = require("../src/requests");

async function transferTokens(
  /*owner:*/ contributor_name,
  /*repo_id:*/ repo_id,
  /*from:*/ from,
  /*to:*/ to,
  /*amount:*/ amount
) {
  try {
    //Transfer tokens to self: return 403
    // if (to === from) {
    //   return 403;
    // }

    //Get contributor's token amount
    // const tokens = await postGetContributorTokenAmount(
    //   /*owner:*/ "",
    //   /*repo:*/ repo_id,
    //   /*pr_id:*/ "",
    //   /*contributor:*/ from,
    //   /*side:*/ ""
    // );

    //Do not have tokens or transfering in excess of balance: return 403
    // if (Number(tokens) < amount || Number(tokens) < 1) {
    //   return 403;
    // }

    //Else proceed with transfer and return 201
    await Token.create({
      from: from,
      to: to,
      repo_id: repo_id,
      amount: String(amount),
    });
    return 201;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = transferTokens;
