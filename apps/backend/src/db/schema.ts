import { jsonb, pgTable, primaryKey, text, timestamp, uuid, vector } from "drizzle-orm/pg-core";
import { user } from "../auth/auth-schema.ts";

export const entries = pgTable("entries", {
  id:        uuid("id").primaryKey().defaultRandom(),
  userId:    text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  type:      text("type").notNull(),
  title:     text("title"),
  content:   text("content"),
  sourceUrl: text("source_url"),
  fileUrl:   text("file_url"),
  note:      text("note"),
  metadata:  jsonb("metadata").$type<{
    channel?: string;
    thumbnail?: string;
    duration?: number;
    author?: string;
    language?: string;
  }>(),
  embedding:  vector("embedding", { dimensions: 384 }),
  ocrText:    text("ocr_text"),
  transcript: text("transcript"),
  lastViewed: timestamp("last_viewed", { withTimezone: true }),
  createdAt:  timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt:  timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const tags = pgTable("tags", {
  id:     uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  slug:   text("slug").notNull(),
  label:  text("label").notNull(),
});

export const entryTags = pgTable("entry_tags", {
  entryId: uuid("entry_id").notNull().references(() => entries.id, { onDelete: "cascade" }),
  tagId:   uuid("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
}, (t) => ({
  pk: primaryKey({ columns: [t.entryId, t.tagId] }),
}));

export const links = pgTable("links", {
  id:        uuid("id").primaryKey().defaultRandom(),
  userId:    text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  sourceId:  uuid("source_id").notNull().references(() => entries.id, { onDelete: "cascade" }),
  targetId:  uuid("target_id").notNull().references(() => entries.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
