# Usage

### Build image and containers in detatched mode from root directory

```
docker-compose up --build -d
```

### Get container id of getting-started-library_1

```
docker ps
```

### Enter bash or shell session in container getting-started-library_1

```
docker exec -it <first 3 chars getting-started-library_1 container id> bash *or* sh
```

### Connect to the database

```
npm start
```

### Run tests

```
npm test
```

Enter npm start again to clear database if running tests a second time.

Exit Shell or Bash session:

### Remove containers:

```
docker-compose down
```
