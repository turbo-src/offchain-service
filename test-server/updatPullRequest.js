const assert = require('assert')
const { updatePullRequest, postGetPullRequest } = require('../src/requests')

describe('update pull request', function () {
    it('should return 201 if pull request is updated', async function () {
        const openStatus = await postGetPullRequest(
            /*owner:*/ 'joseph',
            /*repo:*/ 'joseph/demo',
            /*defaultHash:*/ 'defaultHash1',
            /*contributor:*/ '',
            /*side:*/ '',
        )
        const updateRes = await updatePullRequest(
            /*repo:*/ 'joseph/demo',
            /*defaultHash:*/ 'defaultHash1',
            /*childDefaultHash:*/ 'ab3fc',
        )
        const updateStatus = await postGetPullRequest(
            /*owner:*/ 'joseph',
            /*repo:*/ 'joseph/demo',
            /*defaultHash:*/ 'defaultHash1',
            /*contributor:*/ '',
            /*side:*/ '',
        )
        assert.equal(
            updateRes,
            201,
            'fail to update pull request child defaultHash',
        )
        assert.deepEqual(
            openStatus,
            {
                status: 200,
                state: 'merge',
                repo_id: 'joseph/demo',
                fork_branch: 'pullRequest1',
                childDefaultHash: 'defaultHash',
                defaultHash: 'defaultHash',
                head: 'head',
                branchDefaultHash: 'branchDefaultHash',
                remoteURL: 'remoteURL',
                baseBranch: 'baseBranch',
            },
            'Fail to stay open.',
        )
        assert.deepEqual(
            updateStatus,
            {
                status: 200,
                state: 'merge',
                repo_id: 'joseph/demo',
                fork_branch: 'pullRequest1',
                childDefaultHash: 'defaultHash',
                defaultHash: 'ab3fc',
                head: 'head',
                branchDefaultHash: 'branchDefaultHash',
                remoteURL: 'remoteURL',
                baseBranch: 'baseBranch',
            },
            'Fail to stay open.',
        ) //assert.deepEqual( prStatusNotFound,
    //  { state: 200, exists: false },
    //  "This repo should return 404 as it has not been created"
    //);
    })
})
