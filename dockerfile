FROM node:18-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install 

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
