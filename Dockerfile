FROM nodesource/vivid

RUN apt-get update && apt-get install -y \
    libkrb5-dev # needed for the npm mongod install

# cache package.json and node_modules to speed up builds
ADD package.json package.json
RUN npm install

ENV NODE_ENV dev

# Add your source files
ADD . .
EXPOSE 5000
CMD ["npm","start"]