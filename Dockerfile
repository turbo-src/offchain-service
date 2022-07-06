FROM node:16.15-bullseye

RUN apt update

ENV NODE_PATH=/usr/local/node_modules

WORKDIR /project
COPY . .
RUN npm install -y --location=global npm@latest --prefix /usr/local/
RUN npm install --save-dev -y mocha --prefix /usr/local/
RUN npm install --save -y sequelize --prefix /usr/local/
RUN npm install --save -y pg pg-hstore --prefix /usr/local/
RUN npm start

