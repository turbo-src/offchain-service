# Usage

### Build image and containers in detatched mode from root directory

Build.

```
docker build -t turbosrc-offchain-service:latest.
```

Launch, but perhaps build flag is redundant here (had issues of it not actually rebuilding image as thought).

```
docker-compose up --build
```

### If not building, may need to pull node image:

```
docker pull node:16.15-bullseye
```

### Get container id of privateStore_library_1

```
docker ps
```

### Enter bash or shell session in container privateStore_library_1

```
docker exec -it <privateStore_library_1 id> bash *or* sh
```

### Connect to the database, start the Graphql server, ports 5432 and 4002

```
npm start
```

### New terminal window

### Run tests

```
./test-server/run-tests.sh
```

### N.B.:

Enter npm start again to clear database if running tests a second time.

### Exit Shell or Bash session

```
exit
```

### Remove containers when done:

```
docker-compose down
```

# Functions and their return values if request is successful

### createRepo

```
201
```

### createUser

```
201
```

### createPullRequest

```
201
```

### setVote

```
201 if valid, 403 if user has voted on this pull request already
```

### transferTokens

```
201
```

### getContributorID

```
a string with the contributor id
```

### getContributorName

```
a string with the contributor's name (github login)
```

### getRepoStatus

```
a boolean, true if repo is tokenized, else false
```

### getAuthorizedContributor

```
a boolean
```

### getPRStatus

```
a string of either closed open or merge
```

### getRepoToken amount

```
a string of 1000000
```

### getContributorTokenAmount

```
a string of the amount of tokens a user has in the given repo
```

### getVoteNoTotals

```
a string of the total number of votes against a pull request
```

### getVoteYesTotals

```
a string of the total number of votes in favor of a pull request
```

### getVoteStatus

```
Use getPRStatus instead
```

### getQuorum

```
a string representing the repo's quorum. default is ".34"
```

### setQuorum

```
204
```
