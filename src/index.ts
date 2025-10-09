import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import typeDefs from "./schema";
import resolvers from "./resolvers";

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
});

const { url } = await startStandaloneServer(apolloServer, {
	listen: { port: 4000 },
});

console.log("Server started on port", url);
