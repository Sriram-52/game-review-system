import { prisma } from "./prisma";

export default {
	Query: {
		async games() {
			return await prisma.game.findMany();
		},
		async reviews() {
			return await prisma.review.findMany();
		},
		async authors() {
			return await prisma.author.findMany();
		},
	},
};
