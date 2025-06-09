# frontend/Dockerfile

# frontend/Dockerfile for development:
FROM node:18-alpine

# Set working directory
WORKDIR /app
    
# Copy package.json and lock file
# package-lock.json is optional, but it's a good practice to include it to ensure consistent installs/no dependency issues
COPY package*.json ./ 
    
# Install dependencies
RUN npm install
    
# Copy the rest of the app
COPY . .
    
# Expose the port Vite uses
EXPOSE 5173
    
# Run dev server
CMD ["npm", "run", "dev"]



# frontend/Dockerfile for production:
#FROM node:18-alpine

# Set working directory
#WORKDIR /app

# Copy package.json and lock file
#COPY package*.json ./

# Install dependencies and a lightweight static file server
#RUN npm install
#RUN npm install -g serve

# Copy the rest of the app and run npm build
#COPY . .
#RUN npm run build

# Run production server
#EXPOSE 3000
#CMD ["serve", "-s", "dist", "-l", "3000"]
