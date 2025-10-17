import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "./src/schema.ts",
	generates: {
		"./generated/graphql.ts": {
			plugins: ["typescript", "typescript-resolvers"],
			config: {
				useIndexSignature: false,
				useTypeImports: true,
				contextType: "../src/prisma#Context",
				mappers: {
					Game: "./prisma#Game as PrismaGame",
					Review: "./prisma#Review as PrismaReview",
					Author: "./prisma#Author as PrismaAuthor",
				},
			},
		},
	},
};

export default config;
