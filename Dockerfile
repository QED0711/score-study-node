FROM node:12.16.1-buster

RUN apt-get update
RUN apt-get install nano

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
COPY . /app

CMD ["npm", "run", "start-dev"]