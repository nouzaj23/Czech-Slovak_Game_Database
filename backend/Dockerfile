# Use official Node.js runtime as a parent image
FROM node:19-alpine

# Create app directory
WORKDIR /usr/src/app

# Create a new user "appuser" and set as current user
RUN addgroup appgroup && adduser -S -G appgroup appuser
RUN chown -R appuser:appgroup /usr/src/app
USER appuser

# Copy package.json and package-lock.json to the working directory
COPY --chown=appuser:appgroup package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source inside Docker image
COPY --chown=appuser:appgroup . .

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the app when the container launches
CMD [ "node", "app.js" ]
