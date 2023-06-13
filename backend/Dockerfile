FROM node:19-alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source inside Docker image
COPY . .
RUN rm -rf dist
RUN echo $DOTENV > .env

RUN npm run build

EXPOSE 3000

# Run the app when the container launches
# CMD npm run build && ls -ls && ls -ls dist
# CMD ls -ls && ls -ls dist
# CMD pwd && find . -type f | grep -v "node_modules" && npm run start
# CMD npm run start
CMD echo $DOTENV && npm run start
