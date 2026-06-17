import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as authSchema from "../auth/auth-schema.js";
import * as schema from "./schema.js";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema: { ...authSchema, ...schema } });
