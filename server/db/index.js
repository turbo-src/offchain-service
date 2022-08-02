const db = require("./db");
const Repo = require("./Models/Repo");
const Contributor = require("./Models/Contributor");
const Token = require("./Models/Token");
const Vote = require("./Models/Vote");
const PullRequest = require("./Models/PullRequest");

// Associations here
Repo.hasMany(Contributor);
Repo.hasMany(PullRequest);
PullRequest.hasMany(Vote);
Contributor.hasMany(Vote);
Vote.belongsTo(Contributor);
Vote.belongsTo(PullRequest);

module.exports = { db, Repo, Contributor, Token, Vote, PullRequest };
