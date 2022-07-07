import assert from "assert";
import createUser from "../lib/createUser.js";
import getContributorName from "../lib/getContributorName.js";

describe("createUser", function () {
  it("should create a new contributor in the database", async function () {
    await createUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "111111111111",
      /*contributor_name:*/ "neo",
      /*contributor_signature:*/ "2ae1111111111"
    );

    const res = await getContributorName("111111111111");

    assert.equal(res, "neo", "Failed to create a user");
  });
});
