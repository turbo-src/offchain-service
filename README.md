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
docker exec -it <first 3 chars getting-started-library_1 container id> bash *or* sh
```

### Connect to the database, start the Graphql server

```
npm start
```

### Run tests

```
./test/run-tests.sh
```

N.B. Enter npm start again to clear database if running tests a second time.

### Exit Shell or Bash session

```
exit
```

### Remove containers:

```
docker-compose down
```
