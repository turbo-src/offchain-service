import { Contributor } from "../db/index.js";
export default async function getContributorID(contributor_name) {
  try {
    const contributor = await Contributor.findOne({
      where: { contributor_name: contributor_name },
    });
    return contributor.contributor_id;
  } catch (error) {
    return `There was an error: ${error}`;
  }
}
