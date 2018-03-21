FROM node:slim

WORKDIR /usr/src/app

COPY . .

ENV PORT=3000

RUN npm install --quiet
RUN npm run build

EXPOSE 3000

CMD npm start
