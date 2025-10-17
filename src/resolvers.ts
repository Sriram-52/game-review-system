import { prisma } from "./prisma";
import type { Context } from "./prisma";
import type {
	Resolvers,
	QueryResolvers,
	MutationResolvers,
	GameResolvers,
	ReviewResolvers,
	AuthorResolvers,
	MutationCreateGameArgs,
	MutationUpdateGameArgs,
	MutationDeleteGameArgs,
	MutationCreateReviewArgs,
	MutationUpdateReviewArgs,
	MutationDeleteReviewArgs,
	MutationCreateAuthorArgs,
	MutationUpdateAuthorArgs,
	MutationDeleteAuthorArgs,
	QueryGameArgs,
	QueryReviewArgs,
	QueryAuthorArgs,
} from "../generated/graphql";

const resolvers: Resolvers<Context> = {
	Query: {
		async games() {
			return await prisma.game.findMany();
		},
		async game(_, args: QueryGameArgs) {
			return await prisma.game.findUnique({ where: { id: args.id } });
		},

		async reviews() {
			return await prisma.review.findMany();
		},
		async review(_, args: QueryReviewArgs) {
			return await prisma.review.findUnique({ where: { id: args.id } });
		},

		async authors() {
			return await prisma.author.findMany();
		},
		async author(_, args: QueryAuthorArgs) {
			return await prisma.author.findUnique({ where: { id: args.id } });
		},
	} satisfies QueryResolvers<Context>,

	Game: {
		async reviews(parent) {
			return await prisma.review.findMany({
				where: { gameId: parent.id },
			});
		},
	} satisfies GameResolvers<Context>,

	Review: {
		async game(parent) {
			return await prisma.game.findFirstOrThrow({
				where: { id: parent.gameId },
			});
		},
		async author(parent) {
			return await prisma.author.findFirstOrThrow({
				where: { id: parent.authorId },
			});
		},
	} satisfies ReviewResolvers<Context>,

	Author: {
		async reviews(parent) {
			return await prisma.review.findMany({
				where: { authorId: parent.id },
			});
		},
	} satisfies AuthorResolvers<Context>,

	Mutation: {
		// Game mutations
		async createGame(_, args: MutationCreateGameArgs) {
			return await prisma.game.create({
				data: {
					title: args.input.title,
					platform: args.input.platform,
				},
			});
		},
		async updateGame(_, args: MutationUpdateGameArgs) {
			return await prisma.game.update({
				where: { id: args.id },
				data: {
					...(args.input.title && { title: args.input.title }),
					...(args.input.platform && { platform: args.input.platform }),
				},
			});
		},
		async deleteGame(_, args: MutationDeleteGameArgs) {
			return await prisma.game.delete({
				where: { id: args.id },
			});
		},

		// Review mutations
		async createReview(_, args: MutationCreateReviewArgs) {
			return await prisma.review.create({
				data: {
					rating: args.input.rating,
					content: args.input.content,
					gameId: args.input.gameId,
					authorId: args.input.authorId,
				},
			});
		},
		async updateReview(_, args: MutationUpdateReviewArgs) {
			return await prisma.review.update({
				where: { id: args.id },
				data: {
					...(args.input.rating !== undefined &&
						args.input.rating !== null && { rating: args.input.rating }),
					...(args.input.content && { content: args.input.content }),
				},
			});
		},
		async deleteReview(_, args: MutationDeleteReviewArgs) {
			return await prisma.review.delete({
				where: { id: args.id },
			});
		},

		// Author mutations
		async createAuthor(_, args: MutationCreateAuthorArgs) {
			return await prisma.author.create({
				data: {
					name: args.input.name,
					verified: args.input.verified ?? false,
				},
			});
		},
		async updateAuthor(_, args: MutationUpdateAuthorArgs) {
			return await prisma.author.update({
				where: { id: args.id },
				data: {
					...(args.input.name && { name: args.input.name }),
					...(args.input.verified !== undefined &&
						args.input.verified !== null && {
							verified: args.input.verified,
						}),
				},
			});
		},
		async deleteAuthor(_, args: MutationDeleteAuthorArgs) {
			return await prisma.author.delete({
				where: { id: args.id },
			});
		},
	} satisfies MutationResolvers<Context>,
};

export default resolvers;
