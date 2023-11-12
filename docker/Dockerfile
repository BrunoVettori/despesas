FROM node:18.13.0-alpine

ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr
RUN apk --no-cache update
RUN apk --no-cache add openssl
ENV NODE_ENV production
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
CMD npm run start
# CMD [ "node", "./dist/app.js" ]