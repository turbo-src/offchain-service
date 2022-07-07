import assert from "assert";
import createUser from "../lib/createUser.js";

describe("createUser", function () {
  it("should create a new contributor with name and id as the only required values", async function () {
    await createUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "0x09EAF54C0fc9F2b077ebC96e3FeD47051f7fb626",
      /*contributor_name:*/ "mary",
      /*contributor_signature:*/ "2aee41131c1f78f9f881a8be2ea9e1f6faae9ba1b6d78449dca708084b193886"
    );

    const res = await getContributorNameById("111");

    assert.equal(res, "mary", "Failed to create a repo in the database");
  });
});
