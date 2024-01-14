const assert = require('assert')
const {
    postSetVote,
    postGetMostRecentLinkedPullRequest,
} = require('../src/requests')

let snooze_ms = 5000

describe('Duplicate voting should result in a 403 error', function () {
    this.timeout(snooze_ms * 12)
    it('Should check if a vote with the contributor\'s id and pullrequest\'s id has been created. If so, return 403.', async function () {
        const gabrielVote1 = await postSetVote(
            /*owner:*/ 'joseph',
            /*repo:*/ 'joseph/demo',
            /*defaultHash:*/ 'defaultHash3',
            /*childDefaultHash:*/ 'defaultHash3',
            /*mergeable:*/ true,
            /*contributor_id:*/ '0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983',
            /*side:*/ 'yes',
        )

        const gabrielVote2 = await postSetVote(
            /*owner:*/ 'joseph',
            /*repo:*/ 'joseph/demo',
            /*defaultHash:*/ 'defaultHash3',
            /*childDefaultHash:*/ 'defaultHash3',
            /*mergeable:*/ true,
            /*contributor_id:*/ '0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983',
            /*side:*/ 'yes',
        )

        const magdaVote = await postSetVote(
            /*owner:*/ 'joseph',
            /*repo:*/ 'joseph/demo',
            /*defaultHash:*/ 'defaultHash3',
            /*childDefaultHash:*/ 'defaultHash3',
            /*mergeable:*/ true,
            /*contributor_id:*/ '0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925',
            /*side:*/ 'yes',
        )

        assert.equal(gabrielVote1, 403)
        assert.equal(magdaVote, 201)

        // Clean up by voting to merge the pull requests so other tests ("frozen") cases can proceed.
        await postSetVote(
            /*owner:*/ 'joseph',
            /*repo:*/ 'joseph/demo',
            /*defaultHash:*/ 'defaultHash3',
            /*childDefaultHash:*/ 'defaultHash3',
            /*mergeable:*/ true,
            /*contributor_id:*/ '0x0cc59907e45614540dAa22Cf62520306439360f2',
            /*side*/ 'yes',
        )
        assert.deepEqual(
            await postGetMostRecentLinkedPullRequest(
                /*owner:*/ 'joseph',
                /*repo:*/ 'joseph/demo',
                /*defaultHash:*/ 'defaultHash3',
                /*contributor:*/ '',
                /*side:*/ '',
            ),
            {
                status: 200,
                state: 'merge',
                repo_id: 'joseph/demo',
                fork_branch: 'pullRequest3',
                childDefaultHash: 'defaultHash3',
                defaultHash: 'defaultHash3',
                head: 'head',
                branchDefaultHash: 'branchDefaultHash',
                remoteURL: 'remoteURL',
                baseBranch: 'master',
            },
            'Fail to stay open.',
        )
    })
})
