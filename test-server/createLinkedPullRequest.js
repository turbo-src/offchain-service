const assert = require("assert");
const {
  postSetVote,
  postGetMostRecentLinkedPullRequest,
  postGetPRvoteYesTotals,
  postGetPRvoteNoTotals,
  createLinkedPullRequest,
  postGetPullRequest
} = require("../src/requests");

describe("createLinkedPullRequest", function () {
  it("create a pull request associated with the repo_id supplied", async function () {
    this.timeout(4000);
    // Vote on original
    let michaelVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10",
      /*childDefaultHash:*/ "defaultHash10",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ "yes"
    );

    assert.equal(michaelVote, '201', 'michael failed to vote')

    let michaelPullRequestOnDefaultHash10DefaultHash10 = await postGetPullRequest("joseph", "joseph/demo", "defaultHash10", "", "yes")

    let michaelMostRecentPullRequestOnDefaultHash10DefaultHash10  = await postGetMostRecentLinkedPullRequest(
          /*owner:*/ "joseph",
          /*repo:*/ "joseph/demo",
          /*defaultHash:*/ "defaultHash10",
          /*contributor:*/ "",
          /*side:*/ ""
    );

    assert.deepEqual(
      michaelPullRequestOnDefaultHash10DefaultHash10,
     { status: 200, state: "pre-open", repo_id: "joseph/demo",  fork_branch: "pullRequest10", "childDefaultHash": "defaultHash10", "defaultHash": "defaultHash10", head: "head", branchDefaultHash: "branchDefaultHash", remoteURL: "remoteURL", baseBranch: "master" },
      "Fail to stay open."
    );

    assert.deepEqual(
      michaelMostRecentPullRequestOnDefaultHash10DefaultHash10,
     { status: 200, state: "pre-open", repo_id: "joseph/demo",  fork_branch: "pullRequest10", "childDefaultHash": "defaultHash10", "defaultHash": "defaultHash10", head: "head", branchDefaultHash: "branchDefaultHash", remoteURL: "remoteURL", baseBranch: "master" },
      "Fail to stay open."
    );

    assert.equal(
      await postGetPRvoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10",
      /*contributor:*/ "",
      /*side:*/ ""
      ),
      '50000',
      'fail to add correct yes votes'
    );

    assert.equal(
      await postGetPRvoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10",
      /*contributor:*/ "",
      /*side:*/ ""
      ),
      '0',
      'fail to add correct no votes'
    );

    let gabrielVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10",
      /*childDefaultHash:*/ "defaultHash10b",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*side*/ "yes"
    );


    const linkedPR10b = await createLinkedPullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*parentDefaultHash:*/ "defaultHash10",
      /*defaultHash:*/ "defaultHash10b",
      /*childDefaultHash:*/ "defaultHash10b",
      /*head:*/ "defaultHash10b",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest10",
      /*title:*/ "feat: create linked pull request."
    );

    assert.equal(gabrielVote, '201', 'gabriel failed to vote')
    assert.equal(linkedPR10b, '201', 'failed to create linked pull request')

    let gabrielPullRequestDefaultHash10b = await postGetPullRequest("joseph", "joseph/demo", "defaultHash10b", "", "yes")

    let gabrielMostRecentPullRequestDefaultHash10  = await postGetMostRecentLinkedPullRequest(
          /*owner:*/ "joseph",
          /*repo:*/ "joseph/demo",
          /*defaultHash:*/ "defaultHash10",
          /*contributor:*/ "",
          /*side:*/ ""
    );

    assert.deepEqual(
      gabrielPullRequestDefaultHash10b,
     { status: 200, state: "open", repo_id: "joseph/demo",  fork_branch: "pullRequest10", "childDefaultHash": "defaultHash10b", "defaultHash": "defaultHash10b", head: "defaultHash10b", branchDefaultHash: "branchDefaultHash", remoteURL: "remoteURL", baseBranch: "master" },
      "Fail to stay open."
    );

    assert.deepEqual(
      gabrielMostRecentPullRequestDefaultHash10,
     { status: 200, state: "open", repo_id: "joseph/demo",  fork_branch: "pullRequest10", "childDefaultHash": "defaultHash10b", "defaultHash": "defaultHash10b", head: "defaultHash10b", branchDefaultHash: "branchDefaultHash", remoteURL: "remoteURL", baseBranch: "master" },
      "Fail to stay open."
    );

    assert.equal(
      await postGetPRvoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10",
      /*contributor:*/ "",
      /*side:*/ ""
      ),
      '100000',
      'fail to add correct yes votes'
    );

    assert.equal(
      await postGetPRvoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10",
      /*contributor:*/ "",
      /*side:*/ ""
      ),
      '0',
      'fail to add correct no votes'
    );


    let magdaVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10b",
      /*childDefaultHash:*/ "defaultHash10b",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925",
      /*side*/ "yes"
    );

    assert.equal(magdaVote, '201', 'magda failed to vote')

    let magdaPullRequestDefaultHash10b = await postGetPullRequest("joseph", "joseph/demo", "defaultHash10b", "", "yes")

    let magdaMostRecentPullRequestDefaultHash10  = await postGetMostRecentLinkedPullRequest(
          /*owner:*/ "joseph",
          /*repo:*/ "joseph/demo",
          /*defaultHash:*/ "defaultHash10",
          /*contributor:*/ "",
          /*side:*/ ""
    );

    assert.deepEqual(
      magdaPullRequestDefaultHash10b,
     { status: 200, state: "open", repo_id: "joseph/demo",  fork_branch: "pullRequest10", "childDefaultHash": "defaultHash10b", "defaultHash": "defaultHash10b", head: "defaultHash10b", branchDefaultHash: "branchDefaultHash", remoteURL: "remoteURL", baseBranch: "master" },
      "Fail to stay open."
    );

    assert.deepEqual(
      magdaMostRecentPullRequestDefaultHash10,
     { status: 200, state: "open", repo_id: "joseph/demo",  fork_branch: "pullRequest10", "childDefaultHash": "defaultHash10b", "defaultHash": "defaultHash10b", head: "defaultHash10b", branchDefaultHash: "branchDefaultHash", remoteURL: "remoteURL", baseBranch: "master" },
      "Fail to stay open."
    );

    assert.equal(
      await postGetPRvoteYesTotals(
        /*owner:*/ "joseph",
        /*repo:*/ "joseph/demo",
        /*defaultHash:*/ "defaultHash10b",
        /*contributor:*/ "",
        /*side:*/ ""
      ),
      '150000'
    );

    assert.equal(
      await postGetPRvoteNoTotals(
        /*owner:*/ "joseph",
        /*repo:*/ "joseph/demo",
        /*defaultHash:*/ "defaultHash10b",
        /*contributor:*/ "",
        /*side:*/ ""
      ),
      '0'
    );

    let thomasVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10b",
      /*childDefaultHash:*/ "defaultHash10c",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0c3B10A0B8bC506833A1CD54672a3b67502d7a53",
      /*side*/ "yes"
    );

    const linkedPR10c = await createLinkedPullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*parentDefaultHash:*/ "defaultHash10b",
      /*defaultHash:*/ "defaultHash10c",
      /*childDefaultHash:*/ "defaultHash10c",
      /*head:*/ "defaultHash10c",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest10",
      /*title:*/ "feat: create linked pull request."
    );

    assert.equal(thomasVote, '201', 'thomas failed to vote')
    assert.equal(linkedPR10c, '201', 'failed to create linked pull request')

    let thomasPullRequestDefaultHash10c = await postGetPullRequest("joseph", "joseph/demo", "defaultHash10c", "", "yes")

    let thomasMostRecentPullRequestDefaultHash10  = await postGetMostRecentLinkedPullRequest(
          /*owner:*/ "joseph",
          /*repo:*/ "joseph/demo",
          /*defaultHash:*/ "defaultHash10",
          /*contributor:*/ "",
          /*side:*/ ""
    );

    assert.deepEqual(
      thomasPullRequestDefaultHash10c,
     { status: 200, state: "open", repo_id: "joseph/demo",  fork_branch: "pullRequest10", "childDefaultHash": "defaultHash10c", "defaultHash": "defaultHash10c", head: "defaultHash10c", branchDefaultHash: "branchDefaultHash", remoteURL: "remoteURL", baseBranch: "master" },
      "Fail to stay open."
    );

    assert.deepEqual(
      thomasMostRecentPullRequestDefaultHash10,
     { status: 200, state: "open", repo_id: "joseph/demo",  fork_branch: "pullRequest10", "childDefaultHash": "defaultHash10b", "defaultHash": "defaultHash10b", head: "defaultHash10b", branchDefaultHash: "branchDefaultHash", remoteURL: "remoteURL", baseBranch: "master" },
      "Fail to stay open."
    );

    assert.equal(
      await postGetPRvoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10c",
      /*contributor:*/ "",
      /*side:*/ ""
      ),
      '200000',
      'fail to add correct yes votes'
    );

    assert.equal(
      await postGetPRvoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10c",
      /*contributor:*/ "",
      /*side:*/ ""
      ),
      '0',
      'fail to add correct no votes'
    );
  })
});