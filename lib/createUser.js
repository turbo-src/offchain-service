import { Contributor } from "../db/index.js";

export default async function createUser(
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
    return `There was an error: ${error}`;
  }
}
