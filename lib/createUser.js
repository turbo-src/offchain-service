const { Contributor } = require("../server/db");

async function createUser(
  /*owner:*/ owner,
  /*repo:*/ repo,
  /*contributor_id:*/ contributor_id,
  /*contributor_name:*/ contributor_name,
  /*contributor_signature:*/ contributor_signature
) {
  try {
    await Contributor.create({
      contributor_id: contributor_id,
      contributor_name: contributor_name,
      contributor_signature: contributor_signature,
    });
    return 201;
  } catch (error) {
    console.log(error);
    return error;
  }
}
module.exports = createUser;
