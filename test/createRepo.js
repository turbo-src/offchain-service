var assert = require("assert");
import createRepo, { getTokenAmount } from "../lib";

describe("createRepo", function () {
  it("should return a new repo id", async function () {
    let newRepo = await createRepo();
    let tokenAmount = await getTokenAmount(newRepo.id);
    assert.equal(
      tokenAmount,
      1_000_000,
      "Failed to create a repo in the database"
    );
  });
});
