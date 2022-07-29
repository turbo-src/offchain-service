import db from "./db.js";
import Repo from "./Models/Repo.js";
import Contributor from "./Models/Contributor.js";
import Token from "./Models/Token.js";
import Vote from "./Models/Vote.js";
import PullRequest from "./Models/PullRequest.js";

// Associations here
Repo.hasMany(Contributor);
Repo.hasMany(PullRequest);
PullRequest.hasMany(Vote);
Contributor.hasMany(Vote);
Vote.belongsTo(Contributor);
Vote.belongsTo(PullRequest);

export { db, Repo, Contributor, Token, Vote, PullRequest };
