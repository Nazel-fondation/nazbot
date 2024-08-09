FROM node:20

WORKDIR /bot

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

CMD ["npm", "run", "start"]