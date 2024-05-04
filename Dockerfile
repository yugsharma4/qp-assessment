FROM node:18
WORKDIR /app
COPY package.json .
COPY package-lock.json .

RUN npm install --only=production;
COPY . ./
COPY docker-compose.yml /app/docker-compose.yml
COPY docker-compose.prod.yml /app/docker-compose.prod.yml
# Add any additional Docker Compose files if needed

# Command to run Docker Compose when the container starts
CMD ["docker-compose", "-f", "docker-compose.yml", "-f", "docker-compose.prod.yml", "up", "-d"]

