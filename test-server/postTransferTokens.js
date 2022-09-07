const assert = require("assert");
const {
  postGetContributorTokenAmount,
  postTransferTokens,
} = require("../src/requests");

describe("postTransferTokens", function () {
  it("should transfer tokens between two contributors", async function () {
    await postTransferTokens(
      /*owner*/ "",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0cc59907e45614540dAa22Cf62520306439360f2",
      /*amount*/ "500001"
    );

    await postTransferTokens(
      /*owner*/ "",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*amount*/ "50000"
    );

    await postTransferTokens(
      /*owner*/ "",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*amount*/ "50000"
    );

    await postTransferTokens(
      /*owner*/ "",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925",
      /*amount*/ "50000"
    );

    await postTransferTokens(
      /*owner*/ "",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0c3B10A0B8bC506833A1CD54672a3b67502d7a53",
      /*amount*/ "50000"
    );

    await postTransferTokens(
      /*owner*/ "",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0ceeed31E39a896CB5f69f1a05c013a7840A5f78",
      /*amount*/ "50000"
    );

    await postTransferTokens(
      /*owner*/ "",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0cea312808EdcdC905428D3922480930689F4500",
      /*amount*/ "50000"
    );

    await postTransferTokens(
      /*owner*/ "",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0c587fB3EBA5e824Df543bDE5d972Fd9F7cFC164",
      /*amount*/ "50000"
    );

    const mary = await postGetContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "0x0cc59907e45614540dAa22Cf62520306439360f2",
      /*side:*/ ""
    );
    const gabriel = await postGetContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*side:*/ ""
    );
    const michael = await postGetContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ ""
    );
    const magda = await postGetContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925",
      /*side:*/ ""
    );
    const thomas = await postGetContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "0x0c3B10A0B8bC506833A1CD54672a3b67502d7a53",
      /*side:*/ ""
    );
    const ben = await postGetContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "0x0ceeed31E39a896CB5f69f1a05c013a7840A5f78",
      /*side:*/ ""
    );
    const louis = await postGetContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "0x0cea312808EdcdC905428D3922480930689F4500",
      /*side:*/ ""
    );
    const thibaut = await postGetContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "0x0c587fB3EBA5e824Df543bDE5d972Fd9F7cFC164",
      /*side:*/ ""
    );
    const joseph = await postGetContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*side:*/ ""
    );
    const ignacius = await postGetContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "0x0c16EFDc6e6490fd6066AB794Dc841A50eB5C90C",
      /*side:*/ ""
    );

    assert.deepEqual(
      mary,
      { status: 200, amount: 5_00_001 },
      "Failed to transfer tokens to Mary"
    );
    assert.deepEqual(
      gabriel,
      { status: 200, amount: 50_000 },
      "Failed to transfer tokens to Gabriel"
    );
    assert.deepEqual(
      michael,
      { status: 200, amount: 50_000 },
      "Failed to transfer tokens to Michael"
    );
    assert.deepEqual(
      magda,
      { status: 200, amount: 50_000 },
      "Failed to transfer tokens to Magda"
    );
    assert.deepEqual(
      thomas,
      { status: 200, amount: 50_000 },
      "Failed to transfer tokens to Thomas"
    );
    assert.deepEqual(
      ben,
      { status: 200, amount: 50_000 },
      "Failed to transfer tokens to Ben");
    assert.deepEqual(
      louis,
      { status: 200, amount: 50_000 },
      "Failed to transfer tokens to Louis"
    );
    assert.deepEqual(
      thibaut,
      { status: 200, amount: 50_000 },
      "Failed to transfer tokens to Thibaut"
    );
    assert.deepEqual(
      ignacius,
      { status: 200, amount: 0 },
     "Ignacius should have 0 tokens"
    );
  });
});
