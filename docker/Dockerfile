FROM node:16.15-bullseye

RUN apt update

ENV NODE_PATH=/usr/local/node_modules

RUN npm install -y --location=global npm@latest --prefix /usr/local/
RUN npm install -y graphql@16.01 --prefix /usr/local/
RUN npm install -y express-graphql@0.12.0 --prefix /usr/local/
RUN npm install -y superagent@6.1.0 --prefix /usr/local/
RUN npm install --save-dev -y mocha --prefix /usr/local/

WORKDIR /project