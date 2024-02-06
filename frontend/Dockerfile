# Use an official Node.js runtime as a parent image
FROM node:20.8

# Set the working directory in the container
WORKDIR /app/frontend

# Copy the current directory contents into the container
COPY . /app/frontend

# Install any needed packages specified in package.json
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run app.js when the container launches
CMD ["npm", "start"]
