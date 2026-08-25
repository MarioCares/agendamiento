import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: [
		"./src/modules/**/backend/database/schema/*.schema.ts",
		"./src/modules/**/infrastructure/persistence/*.schema.ts",
		"./src/modules/**/infrastructure/persistence/*.schemas.ts",
		"./src/shared/**/persistence/*.schema.ts",
	],
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL || "",
	},
});
