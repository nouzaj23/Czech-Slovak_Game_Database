# Use official Node.js runtime as a parent image
FROM node:19-alpine

# Set the working directory
WORKDIR /usr/app

# Create a new user "appuser" and set as current user
RUN addgroup appgroup && adduser -S -G appgroup appuser
# RUN chown -R appuser:appgroup /usr/app
# USER appuser

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY --chown=appuser:appgroup . .

# Build the app
RUN npm run build

# Expose port 3000
EXPOSE 5173

# Run the app when the container launches
CMD [ "npm", "run", "dev" ]
