import { prisma } from "./prisma";

export default {
	Query: {
		async games() {
			return await prisma.game.findMany();
		},
		async game(_, args: Record<string, any>) {
			return await prisma.game.findUnique({ where: { id: args.id } });
		},

		async reviews() {
			return await prisma.review.findMany();
		},
		async review(_, args: Record<string, any>) {
			return await prisma.review.findUnique({ where: { id: args.id } });
		},

		async authors() {
			return await prisma.author.findMany();
		},
		async author(_, args: Record<string, any>) {
			return await prisma.author.findUnique({ where: { id: args.id } });
		},
	},
};
