const { Repo } = require('../../server/db')

async function setQuorum(
    /*repo:*/ repo_id,
    /*contributor_id*/ contributor_id,
    /*quorum*/ quorum,
) {
    try {
        const repo = await Repo.findOne({
            where: { repo_id: repo_id, contributor_id: contributor_id },
        })

        await repo.update({
            quorum: quorum,
            where: { repo_id: repo_id },
        })
        return 204
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = setQuorum
