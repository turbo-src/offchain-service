const { Contributor } = require('../server/db')

async function getContributorSignature(
    owner,
    repo,
    defaultHash,
    contributor_name,
) {
    try {
        const contributor = await Contributor.findOne({
            where: { contributor_name: contributor_name },
        })
        return contributor.contributor_signature
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = getContributorSignature
