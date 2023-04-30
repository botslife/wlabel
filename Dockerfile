# Base image
FROM node:14.17-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json .env ./
COPY public ./public
COPY src ./src

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
#COPY . .

# Build the application
#RUN npm run build

# Expose port 3333
EXPOSE 3300

# Start the application
CMD ["npm", "start"]