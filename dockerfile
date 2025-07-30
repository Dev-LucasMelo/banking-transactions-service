FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install --include=dev

COPY . .

RUN npx prisma generate

RUN npx prisma migrate dev --name init --skip-seed || true

CMD ["npm", "run", "start:dev"]