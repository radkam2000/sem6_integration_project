FROM node:alpine

WORKDIR /app
COPY package.json .

RUN npm install build

COPY . .
EXPOSE 3000
CMD ["npm","run","start"]