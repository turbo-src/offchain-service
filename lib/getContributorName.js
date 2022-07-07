import { Contributor } from "../db/index.js";
export default async function getContributorName(contributor_id) {
  try {
    const contributor = await Contributor.findOne({
      where: { contributor_id: contributor_id },
    });
    return contributor.contributor_name;
  } catch (error) {
    return `There was an error: ${error}`;
  }
}
