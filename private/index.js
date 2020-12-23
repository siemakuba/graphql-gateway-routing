import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

const port = 4003;

const typeDefs = gql`
  type Private @key(fields: "id") {
    id: ID!
    private: Boolean
  }


  extend type Query {
    private: Private
  }
`;

const resolvers = {
  Query: {
    private() {
      return { private: true }
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port }).then(({ url }) => {
  console.log(`Private service ready at ${url}`);
});
