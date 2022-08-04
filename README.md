# Usage

### Build image and containers in detatched mode from root directory

```
docker-compose up --build -d
```

### If not building, may need to pull node image:

```
docker pull node:16.15-bullseye
```

### Get container id of getting-started-library_1

```
docker ps
```

### Enter bash or shell session in container getting-started-library_1

```
docker exec -it <getting-started-library_1 id> bash *or* sh
```

### Connect to the database, start the Graphql server, ports 5432 and 4000

```
npm start
```

### Then

```
ctrl c
```

### Run tests

```
./test/run-tests.sh
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
201
```

### transferTokens

```
200
```

### getContributorID

```
a string with the contributor id
```

### getContributorName

```
a string with the contributor's name (github login)
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
a string of the total number of votes against a pull request
```

### getVoteStatus

```
status of pr for a repo, string either open close or merge \*same as getPRStatus
```

### getQuorum

```
a string representing the repo's quorum. default is ".34"
```

### setQuorum

```
204
```
