FROM node:16.15-bullseye

RUN apt update

ENV NODE_PATH=/usr/local/node_modules

RUN npm install -y -g npm@latest

WORKDIR /project
# Don't use npm link in production.
WORKDIR /project/repoint_opreturn
# Dev stuff.
RUN npm install --save-dev -y eslint
RUN npm install --save-dev -y mocha