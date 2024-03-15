FROM node:16-alpine
WORKDIR /app
COPY . /app
RUN npm install --legacy-peer-deps
RUN npm run build-dev
EXPOSE 5000
CMD ["npm", "start"]
