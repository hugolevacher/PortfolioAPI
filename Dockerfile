FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

RUN npm prune --production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]