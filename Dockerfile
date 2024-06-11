FROM node:18-alpine

# Define workspace
WORKDIR /app

# Install python for node-gyp dependancy
RUN apk add --no-cache g++ make py3-pip

# Install Angular CLI
RUN npm install -g @angular/cli

COPY package.json package-lock.json ./

# Clean install dependancies to avoid macOS/windows/linux conflicts
RUN npm ci

# Copy rest of files
COPY . .

# Expose port 4200
EXPOSE 4200

# Start Angular dev server
CMD ["ng", "serve", "--host", "0.0.0.0"]
