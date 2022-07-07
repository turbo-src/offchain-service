import assert from "assert";
import getContributorID from "../lib/getContributorID";

describe("getContributorId", function () {
  it("should return a contributor's id (ethereum address) based on their name (github login)", async function () {
    await createUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "0x09EAF54FEFJEIJFWIW34243F232T4G",
      /*contributor_name:*/ "magda",
      /*contributor_signature:*/ "2aeeU8UFS8UFD8FWEFE9W832G8934GHG9HG434HVXD8S"
    );

    let contributorId = await getContributorID("magda");

    assert.equal(
      contributorId,
      "0x09EAF54FEFJEIJFWIW34243F232T4G",
      "Failed to create a repo in the database"
    );
  });
});
