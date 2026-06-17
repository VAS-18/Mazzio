import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { auth } from "./auth/auth.js";

const app = new Hono();

app.on(["GET", "POST"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.get("/", (c) => c.json({ status: "ok" }));

const PORT = Number(process.env.PORT) || 3000;

serve({ fetch: app.fetch, port: PORT });
