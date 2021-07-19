FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY packages/bing-provider/package*.json ./packages/bing-provider/
COPY packages/chromecastbg-provider/package*.json ./packages/chromecastbg-provider/
COPY packages/local-provider/package*.json ./packages/local-provider/
COPY packages/server/package*.json ./packages/server/
COPY lerna.json ./

RUN npm install
RUN npm run bootstrap

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN mkdir ./images

WORKDIR /usr/src/app/packages/server

EXPOSE 3000

ENV BASE_URL=0.0.0.0
ENV IMAGE_DIRECTORY=/usr/src/app/images/

CMD [ "node", "src/server.js" ]

