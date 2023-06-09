FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 8080 

RUN npx prisma generate
RUN npm run build

CMD [ "node", "dist/src/index.js" ]