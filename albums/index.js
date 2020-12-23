import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

import { albums } from "../data.js";

const port = 4002;

const typeDefs = gql`
  type Album @key(fields: "id") {
    id: ID!
    title: String
  }

  extend type Band @key(fields: "id") {
    id: ID! @external
    albums: [Album]
  }

  extend type Query {
    album(id: ID!): Album
    albums: [Album]
  }
`;

const resolvers = {
  Album: {
    __resolveReference(object) {
      return albums.find((album) => album.id === object.id);
    }
  },
  Band: {
    albums(band) {
      return albums.filter((album) => album.bandId === band.id);
    }
  },
  Query: {
    album(_, { id }) {
      return albums.find((album) => album.id === id);
    },
    albums() {
      return albums;
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port }).then(({ url }) => {
  console.log(`Albums service ready at ${url}`);
});
