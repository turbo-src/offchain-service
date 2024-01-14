const { Repo } = require('../../server/db')

async function getQuorum(/*repo:*/ repo_id) {
    try {
        const repo = await Repo.findOne({
            where: { repo_id: repo_id },
        })
        return repo.quorum
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = getQuorum
