FROM node:latest

# Create the directory
RUN mkdir -p /usr/src/ytcmod
WORKDIR /usr/src/ytcmod

# Copy and Install
COPY package.json /usr/src/ytcmod
RUN npm install
COPY . /usr/src/ytcmod

# Start
CMD ["node", "."]