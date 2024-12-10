# Step 1: Use the official Node.js image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Install dependencies
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci

# Step 4: Copy the rest of the application
ARG CACHEBUST=1
COPY . .

# Step 5: Build the Next.js app
RUN npm run build

# Step 6: Expose the Next.js app's port
EXPOSE 3000

# Step 7: Start the Next.js app
CMD ["npm", "start"]
