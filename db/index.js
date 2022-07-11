import db from "./db.js";
import Repo from "./Models/Repo.js";
import Contributor from "./Models/Contributor.js";
import Token from "./Models/Token.js";
import Vote from "./Models/Vote.js";
import PullRequest from "./Models/PullRequest.js";

// Associations here
Repo.hasMany(Contributor);
// Contributor.belongsToMany(Repo, { through: Token });
Repo.hasMany(PullRequest);
PullRequest.hasMany(Vote);
Contributor.hasMany(Vote);

try {
  await db.sync({ force: true });
  await db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export { db, Repo, Contributor, Token, Vote, PullRequest };
