FROM node:alpine

WORKDIR /var/www/backend

COPY ./package.json ./
RUN npm install

COPY ./ ./

CMD ["node","index.js"]

EXPOSE 3000