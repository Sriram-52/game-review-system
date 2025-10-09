import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema";
import { startStandaloneServer } from "@apollo/server/standalone";

const apolloServer = new ApolloServer({
	typeDefs,
});

const { url } = await startStandaloneServer(apolloServer, {
	listen: { port: 4000 },
});

console.log("Server started on port", url);
