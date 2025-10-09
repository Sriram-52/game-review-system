import { prisma } from "./prisma";

export default {
	Query: {
		async games() {
			return await prisma.game.findMany();
		},
		async game(_: any, args: Record<string, any>) {
			return await prisma.game.findUnique({ where: { id: args.id } });
		},

		async reviews() {
			return await prisma.review.findMany();
		},
		async review(_: any, args: Record<string, any>) {
			return await prisma.review.findUnique({ where: { id: args.id } });
		},

		async authors() {
			return await prisma.author.findMany();
		},
		async author(_: any, args: Record<string, any>) {
			return await prisma.author.findUnique({ where: { id: args.id } });
		},
	},
	Game: {
		async reviews(parent: Record<string, any>) {
			return await prisma.review.findMany({
				where: { gameId: parent.id },
			});
		},
	},
	Review: {
		async game(parent: Record<string, any>) {
			console.log("Review -> game", parent);
			return await prisma.game.findFirstOrThrow({
				where: { reviews: { some: { id: parent.id } } },
			});
		},
		async author(parent: Record<string, any>) {
			return await prisma.author.findFirstOrThrow({
				where: { reviews: { some: { id: parent.id } } },
			});
		},
	},
	Author: {
		async reviews(parent: Record<string, any>) {
			return await prisma.review.findMany({
				where: { authorId: parent.id },
			});
		},
	},
};
