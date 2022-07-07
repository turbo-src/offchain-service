import assert from "assert";
import createRepo from "../lib/createRepo.js";
import createPullRequest from "../lib/createPullRequest.js";
import createUser from "../lib/createUser.js";

describe.only("createPullRequest", function () {
  it("create a pull request associated with the repo_id supplied", async function () {
    await createUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "777",
      /*contributor_name:*/ "ignacius",
      /*contributor_signature:*/ "2ae717"
    );

    await createRepo("ignacius", "ignacius/demo", "", "777", "");

    const res = await createPullRequest(
      /*owner:*/ "ignacius",
      /*repo_id:*/ "ignacius/demo",
      /*fork_branch:*/ "pullRequest1",
      /*pr_id:*/ "issue_1",
      /*title:*/ "refactor(lsp): remove redundant client cleanup"
    );

    assert.equal(
      res,
      "pull request: issue_1 successfully added to repo: ignacius/demo",
      "Failed to create a pull request in the database"
    );
  });
});
