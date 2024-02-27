FROM node:20.9.0

WORKDIR /react-app 

COPY package*.json . 

RUN npm --legacy-peer-deps install 

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev"]