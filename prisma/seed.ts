import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
	console.log("Starting seed...");

	// Clear existing data
	await prisma.review.deleteMany();
	await prisma.game.deleteMany();
	await prisma.author.deleteMany();

	// Create games
	const games = await Promise.all([
		prisma.game.create({
			data: {
				id: "1",
				title: "Zelda, Tears of the Kingdom",
				platform: ["Switch"],
			},
		}),
		prisma.game.create({
			data: {
				id: "2",
				title: "Final Fantasy 7 Remake",
				platform: ["PS5", "Xbox"],
			},
		}),
		prisma.game.create({
			data: {
				id: "3",
				title: "Elden Ring",
				platform: ["PS5", "Xbox", "PC"],
			},
		}),
		prisma.game.create({
			data: {
				id: "4",
				title: "Mario Kart",
				platform: ["Switch"],
			},
		}),
		prisma.game.create({
			data: {
				id: "5",
				title: "Pokemon Scarlet",
				platform: ["PS5", "Xbox", "PC"],
			},
		}),
	]);

	console.log(`Created ${games.length} games`);

	// Create authors
	const authors = await Promise.all([
		prisma.author.create({
			data: {
				id: "1",
				name: "mario",
				verified: true,
			},
		}),
		prisma.author.create({
			data: {
				id: "2",
				name: "yoshi",
				verified: false,
			},
		}),
		prisma.author.create({
			data: {
				id: "3",
				name: "peach",
				verified: true,
			},
		}),
	]);

	console.log(`Created ${authors.length} authors`);

	// Create reviews
	const reviews = await Promise.all([
		prisma.review.create({
			data: {
				id: "1",
				rating: 9,
				content: "lorem ipsum",
				authorId: "1",
				gameId: "2",
			},
		}),
		prisma.review.create({
			data: {
				id: "2",
				rating: 10,
				content: "lorem ipsum",
				authorId: "2",
				gameId: "1",
			},
		}),
		prisma.review.create({
			data: {
				id: "3",
				rating: 7,
				content: "lorem ipsum",
				authorId: "3",
				gameId: "3",
			},
		}),
		prisma.review.create({
			data: {
				id: "4",
				rating: 5,
				content: "lorem ipsum",
				authorId: "2",
				gameId: "4",
			},
		}),
		prisma.review.create({
			data: {
				id: "5",
				rating: 8,
				content: "lorem ipsum",
				authorId: "2",
				gameId: "5",
			},
		}),
		prisma.review.create({
			data: {
				id: "6",
				rating: 7,
				content: "lorem ipsum",
				authorId: "1",
				gameId: "2",
			},
		}),
		prisma.review.create({
			data: {
				id: "7",
				rating: 10,
				content: "lorem ipsum",
				authorId: "3",
				gameId: "1",
			},
		}),
	]);

	console.log(`Created ${reviews.length} reviews`);
	console.log("Seed completed successfully!");
}

main()
	.catch((e) => {
		console.error("Error during seed:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
