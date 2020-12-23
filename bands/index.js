import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

import { bands } from "../data.js";

const port = 4001;

const typeDefs = gql`
  type Band @key(fields: "id") {
    id: ID!
    name: String
  }

  extend type Album @key(fields: "id") {
    id: ID! @external
    band: Band
  }

  extend type Query {
    band(id: ID!): Band
    bands: [Band]
  }
`;

const resolvers = {
  Band: {
    __resolveReference(object) {
      return bands.find((band) => band.id === object.id);
    }
  },
  Album: {
    band(album) {
      return bands.find((band) => band.id === album.bandId)
    }
  },
  Query: {
    band(_, { id }) {
      return bands.find((band) => band.id === id);
    },
    bands() {
      return bands;
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port }).then(({ url }) => {
  console.log(`Bands service ready at ${url}`);
});
