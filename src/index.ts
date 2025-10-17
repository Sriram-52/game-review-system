import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import { prisma } from "./prisma";
import type { Context } from "./prisma";

const apolloServer = new ApolloServer<Context>({
	typeDefs,
	resolvers,
});

const { url } = await startStandaloneServer(apolloServer, {
	listen: { port: 4000 },
	context: async () => ({
		prisma,
	}),
});

console.log("Server started on port", url);
