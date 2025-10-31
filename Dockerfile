# FROM node:20-alpine

# COPY package*.json ./
# RUN npm ci 
# USER node

# WORKDIR /home/node/

# COPY . .

# RUN npm run build 
# EXPOSE 8000

# CMD [ "npm", "start" ]

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

ARG PROJECT_Name="Ecom-Platform"

ARG BACK_PORT=8000
ARG BACK_MONGODB_URI="mongodb+srv://yassersellal:mxBddmcR2YkJ1dBm@backednsam.6mimnx1.mongodb.net/?retryWrites=true&w=majority&appName=backednSam"
ARG BACK_MONGODB_NAME="Ecom-Platform"

ARG STATIC="./media"
ARG LOGS="./logs"

ARG BACK_SECRET="tbd"

ARG BACK_EmailHost="smtp.gmail.com"
ARG BACK_EmailPort="465"

ARG BACK_EmailUser="yassosamx@gmail.com"
ARG BACK_EmailPass="gpsfzoyqgbevkjbf"

ARG DEV_Email="yassersellal14@gmail.com"

ARG NODE_ENV="development"
ARG MAIN_URL="https://github.com/SamiSelx"

ARG CLOUDINARY_CLOUD_NAME="dr9zoteco"
ARG CLOUDINARY_API_KEY="321968973278712"
ARG CLOUDINARY_API_SECRET="MTczPe7ww_3gYGt2oJH48uqXyuU"

ARG REDIS_HOST="127.0.0.1"
ARG REDIS_PORT="6379"
ARG REDIST_PASSWORD="123456"

ENV PROJECT_Name=$PROJECT_Name
ENV BACK_PORT=$BACK_PORT
ENV BACK_MONGODB_URI=$BACK_MONGODB_URI
ENV BACK_MONGODB_NAME=$BACK_MONGODB_NAME
ENV STATIC=$STATIC
ENV LOGS=$LOGS
ENV BACK_SECRET=$BACK_SECRET
ENV BACK_EmailHost=$BACK_EmailHost
ENV BACK_EmailPort=$BACK_EmailPort
ENV BACK_EmailUser=$BACK_EmailUser
ENV BACK_EmailPass=$BACK_EmailPass
ENV DEV_Email=$DEV_Email
ENV NODE_ENV=$NODE_ENV
ENV MAIN_URL=$MAIN_URL
ENV CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME
ENV CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY
ENV CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET
ENV REDIS_HOST=$REDIS_HOST
ENV REDIS_PORT=$REDIS_PORT
ENV REDIST_PASSWORD=$REDIST_PASSWORD

CMD [ "npm", "run", "dev" ]