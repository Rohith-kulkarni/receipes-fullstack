FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy backend code + build folder
COPY . .

# Expose port
EXPOSE 8000

# Start backend server only (serves React build as static)
CMD ["node", "app.js"]
