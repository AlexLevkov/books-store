# Use an official Node LTS (long-term support) image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port 2000
EXPOSE 2000

# Start the server
CMD ["npm", "run", "serve"]