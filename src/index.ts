import { Hono } from "hono";
import { validateEnv } from "./config/env";
import { examTypeRoutes } from "./modules/exams/backend/route/exam-type.route";
import { createAuth } from "./modules/identity/backend/auth/auth";
import { requireAuth } from "./modules/identity/backend/middleware/require-auth";
import { adminTestRoute } from "./modules/identity/backend/routes/admin-test.route";
import { createDb } from "./shared/database/db";
import { handleHttpError } from "./shared/domain/errors/handle-http-error";
import type { Variables } from "./types/variables";

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

app.get("/api/v1/health", (c) => {
	return c.json({
		status: "healthy",
		runtime: "Cloudflare Worker",
	});
});

app.use("*", async (c, next) => {
	const env = validateEnv(c.env);
	const db = createDb(env.DATABASE_URL);
	c.set("db", db);
	await next();
});

app.onError((err, c) => {
	return handleHttpError(err, c);
});

app.all("/api/v1/auth/*", async (c) => {
	const auth = createAuth(
		c.get("db"),
		c.env.BETTER_AUTH_URL,
		c.env.BETTER_AUTH_SECRET,
	);
	return auth.handler(c.req.raw);
});

app.get("/api/v1/protected/me", requireAuth, (c) => {
	const user = c.get("user");

	return c.json({
		success: true,
		user,
	});
});

app.route("/api/v1/admin", adminTestRoute);

app.route("/api/v1/exam-types", examTypeRoutes);

export default app;
