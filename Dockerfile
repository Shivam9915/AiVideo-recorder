# Use Node.js to build the app
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Confirm the build folder exists
RUN ls -la /app/dist

# Use nginx to serve the built app
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


Dockerfile