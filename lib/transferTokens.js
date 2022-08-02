const { Token } = require("../server/db");
const getAuthorizedContributor = require("./getAuthorizedContributor");
async function transferTokens(
  /*owner:*/ contributor_name,
  /*repo_id:*/ repo_id,
  /*from:*/ from_contributor_id,
  /*to:*/ to_contributor_id,
  /*amount:*/ amount
) {
  try {
    let from = await getAuthorizedContributor(
      /*owner:*/ "",
      /*repo_id:*/ repo_id,
      /*pr_id:*/ "",
      /*contributor_id:*/ from_contributor_id,
      /*side:*/ ""
    );
    // if (!from) {
    //   return "Not authorized";
    // }
    await Token.create({
      from: from_contributor_id,
      to: to_contributor_id,
      repo_id: repo_id,
      amount: String(amount),
    });
    return 200;
  } catch (error) {
    return error;
  }
}

module.exports = transferTokens;
