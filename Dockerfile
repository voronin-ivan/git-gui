FROM node:slim

WORKDIR /usr/src/app

COPY . .

RUN npm install --quiet

CMD npm start -- --port $PORT
