FROM node:24-alpine3.21 AS builder

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

ENTRYPOINT ["npm", "run", "run"]
