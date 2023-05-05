# Base image for the production
FROM node:lts

# Set the working directory to /client
WORKDIR /

# Copy package.json to the container
COPY package.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application for production
RUN yarn build

# Test folder
RUN ls -la

# Expose port 3000
EXPOSE 3000

# Run the production server
CMD ["yarn", "start"]
