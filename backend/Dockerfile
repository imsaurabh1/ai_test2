# Step 1: Use an official node image as a base
FROM node:18.13.0  

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the application code
COPY . .

# Step 5: Copy the wait-for-it script and make it executable
# COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
# RUN chmod +x /usr/src/app/wait-for-it.sh

# Step 6: Expose the necessary port for the backend
EXPOSE 5000

# Step 7: Command to start the app using wait-for-it
# CMD ["/usr/src/app/wait-for-it.sh", "db", "--", "npm", "start"]
CMD ["npm", "start"]