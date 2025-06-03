# frontend/Dockerfile

# Dockerfile for development:
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock file
# package-lock.json is optional, but it's a good practice to include it to ensure consistent installs/no dependency issues
COPY package*.json ./ 

# Install dependencies
RUN npm install
RUN npm install -g serve # for production

# Copy the rest of the app
COPY . .
RUN npm run build # for production

# Expose the port Vite uses
#EXPOSE 5173 # for developmment

# Run dev server
#CMD ["npm", "run", "dev"]

# Run produiction server
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]





