# Use the official Node.js LTS image as the base
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (default: 3000)
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
