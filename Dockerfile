FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install yarn
RUN npm install -g yarn

# Install app dependencies
COPY ./* ./

# Install dependencies
RUN yarn install

# Build app
RUN yarn run build

# Run preview server
RUN yarn run preview

# Expose port
EXPOSE 4173