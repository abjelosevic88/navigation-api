FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./

# RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Copy wait-for-it script. It is needed to prevent running migrations before MySQL process starts.
RUN mkdir -p /usr/local/scripts
COPY scripts/wait-for-it.sh /usr/local/scripts/wait-for-it.sh
RUN chmod 777 /usr/local/scripts/wait-for-it.sh

EXPOSE 3000
CMD [ "yarn", "dev" ]
