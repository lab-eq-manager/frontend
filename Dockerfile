FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . ./

# Install dependencies
RUN npm install

# Build app
RUN npm run build

# Run preview server
CMD [ "npm", "run", "preview" ]

# Expose port
EXPOSE 4173