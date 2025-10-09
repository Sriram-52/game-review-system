import "dotenv/config";
import type { PrismaConfig } from "prisma/config";
import path from "path";
import { PrismaPg } from "@prisma/adapter-pg";

export default {
	schema: path.join("prisma", "schema.prisma"),
	migrations: { seed: "bun run prisma/seed.ts" },
} satisfies PrismaConfig;
