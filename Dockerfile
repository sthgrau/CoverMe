FROM alpine
RUN apk update && apk upgrade
RUN apk add nodejs
RUN apk add nodejs-npm

COPY package.json package.json  
RUN npm install

# Add your source files
COPY . .  
CMD ["npm","run","start"]  
