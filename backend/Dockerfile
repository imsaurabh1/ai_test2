# Step 1: Use an official node image as a base
FROM node:18.13.0  

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Install netcat for health checks
RUN apt-get update && apt-get install -y netcat

# Step 4: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the application code
COPY . .

# Step 5: Expose the necessary port for the backend
EXPOSE 5000

# Step 6: Command to start the app
CMD ["npm", "start"]
