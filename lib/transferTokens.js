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
    if (to === from) {
      return 403;
    }

    //Get contributor's token amount
    const tokens = await postGetContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ repo_id,
      /*defaultHash:*/ "",
      /*contributor:*/ from,
      /*side:*/ ""
    );
   
    const senderTokenAmount = Number(tokens.amount)

    //Do not have tokens or transfering in excess of balance: return 403
    if (senderTokenAmount < amount || senderTokenAmount < 1) {
      return 403;
    }

    if (amount < 1) {
      return 403;
    }
    
    //Else proceed with transfer and return 201
    await Token.create({
      from: from,
      to: to,
      repo_id: repo_id,
      amount: String(amount),
    });

    return 201;
  } catch (error) {
    return 500
  }
}

module.exports = transferTokens;
