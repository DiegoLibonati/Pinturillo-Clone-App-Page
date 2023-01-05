FROM node AS Production

ENV NODE_ENV=production

WORKDIR /usr/src/my-app

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npm install -g serve

COPY . .

RUN npm run build

CMD ["sh", "-c", "serve -s build"]
