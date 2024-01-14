const { Contributor } = require('../server/db')

async function getContributorID(owner, repo, defaultHash, contributor_name) {
    try {
        const contributor = await Contributor.findOne({
            where: { contributor_name: contributor_name },
        })
        return contributor.contributor_id
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = getContributorID
