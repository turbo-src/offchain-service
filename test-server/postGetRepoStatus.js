const assert = require('assert')
const { getRepoStatus } = require('../src/requests')

describe('getRepoStatus', function () {
    it('should return 200 if a repo has been tokenized', async function () {
        let repoStatus = await getRepoStatus('joseph/demo')
        let repoStatusNotFound = await getRepoStatus('jeffrey/demo42')
        assert.deepEqual(
            repoStatus,
            { status: 200, exists: true },
            'Failed to find a tokenized repo',
        )
        assert.deepEqual(
            repoStatusNotFound,
            { status: 200, exists: false },
            'This repo should return 404 as it has not been created',
        )
    })
})
