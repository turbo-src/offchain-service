import assert from "assert";
import createRepo from "../lib/createRepo.js";
import createPullRequest from "../lib/createPullRequest.js";
import createUser from "../lib/createUser.js";

describe("createPullRequest", function () {
  it("create a pull request associated with the repo_id supplied", async function () {
    const res = await createPullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*fork_branch:*/ "pullRequest1",
      /*pr_id:*/ "issue_1",
      /*title:*/ "refactor(lsp): remove redundant client cleanup"
    );

    assert.equal(
      res,
      "pull request: issue_1 successfully added to repo: joseph/demo",
      "Failed to create a pull request in the database"
    );
  });
});
