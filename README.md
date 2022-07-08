# Usage

### Build image and containers in detatched mode from root directory

```
docker-compose up --build -d
```

### Get container id of getting-started-library_1

```
docker ps
```

### Enter container by id of getting-started-library_1

```
docker exec -it <container-id  (first 3 chars)> bash *or* sh
```

## Scripts from container:

```
npm start
```

Connects the database. Enter again to clear database if running tests a second time.

```
npm test
```

Runs tests

# Remove containers:

```
docker-compose down
```
