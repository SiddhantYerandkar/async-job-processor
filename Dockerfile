# Use Node base image
FROM node:20

# Create app directory
WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Create logs folder
RUN mkdir -p logs

# Expose port
EXPOSE 5000

# Default command
CMD ["node", "src/server.js"]