FROM node:carbon

WORKDIR /usr/src/app

ENV HOST=0.0.0.0

COPY . .

RUN npm install

EXPOSE 3000

CMD npm start
