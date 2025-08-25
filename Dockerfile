# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy the rest of the application code
COPY . .

# Expose the port (change if your server uses a different port)
EXPOSE 3000

# Debug: check entrypoint script permissions
RUN ls -l /usr/local/bin/docker-entrypoint.sh

# Start the server
CMD ["node", "src/server.js"]
