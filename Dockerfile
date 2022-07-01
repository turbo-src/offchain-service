FROM node:16.15-bullseye

RUN apt update

RUN npm install -y -g npm@latest

WORKDIR /project
# Don't use npm link in production.
WORKDIR /project/repoint_opreturn
# Dev stuff.
RUN npm install --save-dev -y eslint
RUN npm install --save-dev -y mocha

# Copy repoint_opreturn files to container
Copy . /project/repoint_opreturn

# If you use shared volumes, please copy the prototype directory to
# the shared volume folder while in the container.
