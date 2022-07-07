import assert from "assert";
import getContributorName from "../lib/getContributorName.js";
import createUser from "../lib/createUser.js";

describe("getContributorName", function () {
  it("should return a contributor's name (github login) based on their id (ethereum address)", async function () {
    await createUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "0x0932r43f43fgGSDGS432323R3F",
      /*contributor_name:*/ "denis",
      /*contributor_signature:*/ "2aeeU8UCSDCHVH8E3GJ90GJ43JCJ0SC9JSCV8E"
    );

    let contributorName = await getContributorName(
      "0x0932r43f43fgGSDGS432323R3F"
    );

    assert.equal(
      contributorName,
      "denis",
      "Failed to get a contributor's name based on their id"
    );
  });
});
