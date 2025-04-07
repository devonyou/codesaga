FROM node:alpine as development

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm i

COPY apps/llama apps/llama
COPY libs libs

RUN npm run build llama

CMD [ "npm", "run", "start:dev", "llama" ]

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=development /usr/src/app/dist ./dist
COPY proto proto

CMD [ "node", "dist/apps/llama/main"]