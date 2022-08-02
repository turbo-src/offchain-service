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

# Test Story:

Joseph creates a repo called demo.

He then transfers tokens to a list of contributors. 500001 to Mary and 50,000 to a variety of others.

A pull request is added called issue_1.

Michael uses his 50,000 tokens to vote yes.

Mary uses her 500,001 tokens to vote yes.

As a majority of votes have been reached for yes, the repo status is automatically updated to merged.

# To Do:

- Resolve the Postgres volume location in docker-compose

- Achieve a majority through a quorum

- Verify user actions such as voting

- Create a more demanding voting narrative to test safeguards

### Functions and Their Return Values if Request is Successful

### createRepo

'''
204
'''

### createUser

'''
204
'''

### createPullRequest

'''
string: 'pull request PR_ID was successfully added to repo REPO_ID
'''

### setVote

'''
204
'''

### transferTokens

'''
200
'''

### getContributorID

'''
a string with the contributor id
'''

### getContributorName

'''
a string with the contributor's name (github login)
'''

### getAuthorizedContributor

'''
a boolean
'''

### getPRStatus

'''
a string of either closed open or merge
'''

### getRepoToken amount

'''
a string of 1000000
'''

### getContributorTokenAmount

'''
a string of the amount of tokens a user has in the given repo
'''

### getVoteNoTotals

'''
a string of the total number of votes against a pull request
'''

### getVoteYesTotals

'''
a string of the total number of votes against a pull request
'''

### getVoteStatus

'''
status of pr for a repo, string either open close or merge \*same as getPRStatus
'''
