# Use an official Node LTS (long-term support) image. Alpine is a lightweight version.
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Use a lightweight web server to serve the built app
RUN npm install -g serve

# Expose port 3000 (or the port you intend to use)
EXPOSE 3000

# Serve the built app using 'serve'
CMD ["serve", "-s", "dist", "-l", "3000"]
