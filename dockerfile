FROM node:18-alpine
RUN git clone https://github.com/AymericShini/Portfolio.git /app
WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install 
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
