const getContributorTokenAmount = require("./getContributorTokenAmount");

async function getAuthorizedContributor(
  /*contributor_id:*/ contributor_id,
  /*repo_id:*/ repo_id
) {
  let tokens = await getContributorTokenAmount(
    "",
    repo_id,
    "",
    contributor_id,
    ""
  );
  console.log("TOKENZ", tokens);
  if (Number(tokens) >= 1) {
    return true;
  } else {
    return false;
  }
}

module.exports = getAuthorizedContributor;
