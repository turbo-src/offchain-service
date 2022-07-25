import assert from "assert";
import getContributorID from "../lib/getContributorID.js";
import createUser from "../lib/createUser.js";

describe("getContributorId", function () {
  it("should return a contributor's id (ethereum address) based on their name (github login)", async function () {
    let contributorId = await getContributorID("magda");

    assert.equal(
      contributorId,
      "0x09EAF54FEFJEIJFWIW34243F232T4G",
      "Failed to get a contributor's id based on their name"
    );
  });
});
