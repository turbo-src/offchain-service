const assert = require('assert')
const { postGetMostRecentLinkedPullRequest } = require('../src/requests')

describe('getMostRecentLinkedPullRequest', function () {
    it('should get most recent linked pull request', async function () {
        const pullRequestConflicts = await postGetMostRecentLinkedPullRequest(
            /*owner:*/ 'joseph',
            /*repo:*/ 'joseph/demo',
            /*defaultHash:*/ 'defaultHash8',
            /*contributor:*/ '',
            /*side:*/ '',
        )

        const pullRequestUpdates = await postGetMostRecentLinkedPullRequest(
            /*owner:*/ 'joseph',
            /*repo:*/ 'joseph/demo',
            /*defaultHash:*/ 'defaultHash9',
            /*contributor:*/ '',
            /*side:*/ '',
        )
        assert.deepEqual(
            pullRequestConflicts,
            {
                status: 200,
                state: 'new',
                repo_id: 'joseph/demo',
                fork_branch: 'pullRequest8b',
                childDefaultHash: 'defaultHash8b',
                defaultHash: 'defaultHash8b',
                head: 'head',
                branchDefaultHash: 'branchDefaultHash',
                remoteURL: 'remoteURL',
                baseBranch: 'master',
            },
            'Fail to stay open.',
        )

        assert.deepEqual(
            pullRequestUpdates,
            {
                status: 200,
                state: 'new',
                repo_id: 'joseph/demo',
                fork_branch: 'pullRequest9c',
                childDefaultHash: 'defaultHash9c',
                defaultHash: 'defaultHash9c',
                head: 'head',
                branchDefaultHash: 'branchDefaultHash',
                remoteURL: 'remoteURL',
                baseBranch: 'master',
            },
            'Fail to stay open.',
        )
    })
})
