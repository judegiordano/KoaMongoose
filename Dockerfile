# Builder stage just to compile typescript before deploying the js
FROM node:14.15.1 as build

WORKDIR /usr/src/app
COPY . .

RUN npm ci --silent && npm run build

# Production stage, copy results from builder stage
FROM node:14.15.1-alpine3.10

WORKDIR /app
COPY package*.json ./
COPY --from=build /usr/src/app/build ./build
ENV NODE_ENV=production

# Build and run the app
RUN npm ci --quiet --only=production
EXPOSE 3000
CMD [ "npm", "run", "start" ]