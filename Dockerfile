FROM node:16.15-bullseye

RUN apt update

ENV NODE_PATH=/usr/local/node_modules

WORKDIR /project

COPY . .
# COPY package*.json /usr/local/

RUN npm install -y --location=global npm@6
RUN npm install --save-dev -y express
RUN npm install --save-dev -y express-graphql
RUN npm install --save-dev -y graphql
RUN npm install --save-dev -y mocha
RUN npm install --save-dev -y sequelize
RUN npm install --save-dev -y pg pg-hstore

# RUN npm install --prefix /usr/local/

