# Instructions on deploying on Fly.io

## Install Flyctl

### Mac / Homebrew

```
brew install flyctl
```

### Mac

```
curl -L https://fly.io/install.sh | sh
```

### Linux

```
curl -L https://fly.io/install.sh | sh

```

### Windows

```
iwr https://fly.io/install.ps1 -useb | iex
```

### Login to fly.io

```
flyctl auth login
```

# Deploy App

```
flyctl deploy
```

### Notes:

- Deploying reads your Dockerfile, builds and then deploys the Docker image to fly.io at https://private-store.fly.dev/
- The app is already deployed so flyctl deploy is sufficient. For launching a new app, use flyctl launch. This generates a fly.toml file. Ensure the internal port is configured correct;y in the fly
