# Base image for the production
FROM node:lts

# Set the working directory to /server
WORKDIR /server

# Copy package.json to the container
COPY package.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Set the environment variable to production
ENV NODE_ENV production

# Build the TypeScript application for production
RUN yarn build

# Expose port 8080
EXPOSE 8080

# Run the production server
CMD ["yarn", "start"]
