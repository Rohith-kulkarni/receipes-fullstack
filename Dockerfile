FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

CMD ["sh", "-c", "node src/scripts/loadData.js && node src/app.js"]
