const db = require("./db");
const Repo = require("./Models/Repo");
const Transfer = require("./Models/Transfer");
const Vote = require("./Models/Vote");
const PullRequest = require("./Models/PullRequest");

// Associations here
Repo.hasMany(PullRequest);
PullRequest.hasMany(Vote);
Vote.belongsTo(PullRequest);

module.exports = { db, Repo, Transfer, Vote, PullRequest };
