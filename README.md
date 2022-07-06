### Usage

Mounts your project files into the container.

Spin up container

```
docker-compose up
```

Enter container

```
docker exec -it <container-name-from-docker-compose-stdout> bash
```

When enter in, you have `cd ../` to get to your source code.

# Scripts

## npm start

Syncs the database

## npm test

Runs tests

### Setup

```
docker volume create --name=repoint-opreturn-node-modules-data-volume
docker build -t repoint_opreturn:0.1.0 .
```

### Notes

See running containers. Use `-a ` to see non-running also

```
docker ps
```
