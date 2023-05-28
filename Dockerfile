FROM node:16-alpine As development

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm set unsafe-perm true
RUN npm install
COPY . .
RUN npm run build

EXPOSE 8000
CMD ["node", "dist/src/main"]