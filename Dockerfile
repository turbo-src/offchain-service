FROM node:16.15-bullseye

RUN apt update

ENV NODE_PATH=/usr/local/node_modules
ENV PORT=http://localhost:4002
ENV PORT_NO=4002

WORKDIR /project

RUN npm install -y --location=global npm@6 --prefix /usr/local/
RUN npm install --save-dev -y express --prefix /usr/local/
RUN npm install --save-dev -y express-graphql --prefix /usr/local/
RUN npm install --save-dev -y graphql --prefix /usr/local/
RUN npm install --save-dev -y superagent --prefix /usr/local/
RUN npm install --save-dev -y mocha --prefix /usr/local/
RUN npm install --save-dev -y sequelize --prefix /usr/local/
RUN npm install --save-dev -y pg pg-hstore --prefix /usr/local/
RUN npm install --save-dev -y dotenv --prefix /usr/local/

COPY . .