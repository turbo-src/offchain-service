FROM node:16.15-bullseye

RUN apt update

ENV NODE_PATH=/usr/local/node_modules

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
RUN npm install --save-dev -y cross-fetch --prefix /usr/local/

EXPOSE 4002/tcp

COPY . .

CMD npm start
