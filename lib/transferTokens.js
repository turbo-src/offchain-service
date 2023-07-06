const { Transfer } = require("../server/db");
const { postGetVotePowerAmount } = require("../src/requests");

async function transferTokens(
  /*owner:*/ contributor_name,
  /*repo_id:*/ repo_id,
  /*from:*/ from,
  /*to:*/ to,
  /*amount:*/ amount
) {
  let response = {
    status: 0,
    repo: repo_id,
    from: from,
    to: to,
    amount: amount,
    createdAt: '',
    network: 'Turbosrc',
    id: ''
  }
  try {
    //Transfer tokens to self: return 403
    if (to === from) {
      response.status = 403
      return response
    }

    //Get contributor's token amount
    const tokens = await postGetVotePowerAmount(
      /*owner:*/ "",
      /*repo:*/ repo_id,
      /*defaultHash:*/ "",
      /*contributor:*/ from,
      /*side:*/ ""
    );
   
    const senderTokenAmount = Number(tokens.amount)

    //Do not have tokens or transfering in excess of balance: return 403
    if (senderTokenAmount < amount || senderTokenAmount < 1) {
      response.status = 403
      return response
    }

    if (amount < 1) {
      response.status = 403
      return response
    }
    
    //Else proceed with transfer and return 201
    const transfer = await Transfer.create({
      from: from,
      to: to,
      repo_id: repo_id,
      amount: amount,
    });

    response.status = 201
    response.createdAt = transfer.createdAt
    response.id = String(transfer.id)
    return response
  } catch (error) {
    response.status = 500
    return response
  }
}

module.exports = transferTokens;
