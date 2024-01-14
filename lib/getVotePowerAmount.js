const { Transfer } = require('../server/db')
const { sequelize, Op } = require('sequelize')
async function getVotePowerAmount(
    /*owner:*/ owner,
    /*repo:*/ repo_id,
    /*defaultHash:*/ defaultHash,
    /*contributor_id:*/ contributor_id,
    /*side:*/ side,
) {
    try {
        const record = await Transfer.findAll(
            {
                where: {
                    [Op.or]: [{ to: contributor_id }, { from: contributor_id }],
                    repo_id: repo_id,
                },
            },
            { order: ['createdAt', 'ASC'] },
        )

        if (record === []) {
            // No record of user or repo?
            return { status: 204, amount: 0 }
        }

        let res = JSON.stringify(record, 2, null)
        let data = JSON.parse(res)

        //A user's Transferbalance is calculated by subtracting their withdrawls
        //(transfer to column) from their deposits (transfer from)
        let bal = data.reduce((accum, cur) => {
            if (cur.to === contributor_id) {
                accum = accum + cur.amount
            } else if (cur.from === contributor_id) {
                accum = accum - cur.amount
            }
            return accum
        }, 0)

        if (bal < 1) {
            return { status: 404, amount: 0 }
        } else {
            return { status: 200, amount: bal }
        }
    } catch (error) {
        console.log(error)
        return { status: 500, amount: bal }
    }
}

module.exports = getVotePowerAmount
