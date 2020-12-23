import { ApolloGateway } from "@apollo/gateway";
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const port = 4000;

const publicGateway = new ApolloGateway({
  serviceList: [
    { name: "bands", url: "http://localhost:4001" },
    { name: "albums", url: "http://localhost:4002" }
  ]
});

const privateGateway = new ApolloGateway({
  serviceList: [
    { name: "bands", url: "http://localhost:4001?private=true" },
    { name: "albums", url: "http://localhost:4002?private=true" },
    { name: "private", url: "http://localhost:4003" }
  ]
});

const publicServer = new ApolloServer({
  gateway: publicGateway,
  subscriptions: false
});

const privateServer = new ApolloServer({
  gateway: privateGateway,
  subscriptions: false
});

const app = express();

app.use((req, res, next) => {
  let middleware;

  // this is a middleware call, so we have access to the whole request object
  // and we can call the proper gateway based on whatever is available in the request
  switch (req.path) {
    case '/private-graphql':
      middleware = privateServer.getMiddleware({ path: '/private-graphql' });
      middleware(req, res, next);
      break;
    case '/public-graphql':
      middleware = publicServer.getMiddleware({ path: '/public-graphql' });
      middleware(req, res, next);
      break;
    default:
      next();
      break;
  }
});

app.listen({ port }, () => {
  console.log(`Gateway server ready`);
});
