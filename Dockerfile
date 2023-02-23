# BUILD STAGE

FROM node:18-alpine as build

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build


# PRODUCTION STAGE

FROM node:18-alpine as production

WORKDIR /app

COPY --chown=node:node package*.json ./

COPY --from=build --chown=node:node /app/dist ./dist

RUN npm ci --omit=dev && npm cache clean --force

USER node

EXPOSE 8080

CMD ["node", "./dist/main.js"]

