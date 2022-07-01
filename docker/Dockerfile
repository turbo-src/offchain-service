FROM node:16.15-bullseye

RUN apt update

ENV NODE_PATH=/usr/local/node_modules

RUN npm install -y --location=global npm@latest --prefix /usr/local/
RUN npm install --location=global npm@8.13.2

RUN npm install --save-dev -y mocha --prefix /usr/local/

WORKDIR /project