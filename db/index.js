const db = require("./db");

const Repo = require("./Models/Repo");
const Contributor = require("./Models/Contributor");
const Token = require("./Models/Token");
const Vote = require("./Models/Vote");
const PullRequest = require("./Models/PullRequest");

// Associations here
Repo.hasMany(Contributor);
Contributor.belongsToMany(Repo, { through: Token });
Repo.hasMany(PullRequest);
PullRequest.hasMany(Vote);
Contributor.hasMany(Vote);
Repo.hasMany(Vote);

module.exports = {
  db,
  Repo,
  Contributor,
  Token,
  Vote,
  PullRequest,
};
