const assert = require('assert')
const { getVotes } = require('../src/requests')

describe('get votes', function () {
    it('should get all the votes for a pull request and their relevant data, contributor_id, votepower, side, timestamp', async function () {
        const res = await getVotes(
            /*repo:*/ 'joseph/demo',
            /*defaultHash:*/ 'defaultHash2',
            /*contributor_id*/ '0x0c55D3B26A1229B9D707a4272F55E66103301858',
        )
        assert.deepEqual(res.status, 200, 'Fail to get votes for a PR')
        assert.deepEqual(
            res.voteData.contributor.voted,
            true,
            'Fail to get vote\'s votepower for a PR',
        )
        assert.deepEqual(
            res.voteData.voteTotals.yesPercent,
            0.05,
            'Fail to get vote\'s yes percent decimal',
        )
        assert.deepEqual(
            res.voteData.voteTotals.noPercent,
            0.800001,
            'Fail to get vote\'s no percent decimal',
        )
        assert.deepEqual(
            res.voteData.voteTotals.totalVotePercent,
            0.850001,
            'Fail to get vote\'s total percent decimal',
        )
    })
})
