import { entries, entryTags, tags } from "../db/schema.js";
import { CreateEntryInput } from "./entries.types.js";

export const createEntry = async (
  db: any,
  input: CreateEntryInput,
  userId: string,
) => {
  const { type, content, title } = input;

  const result = await db
    .insert(entries)
    .values({ type, content, title, userId })
    .returning();

  if (input.tags) {
    const InputTags = input.tags.map((tag) => ({
      userId: userId,
      slug: tag.toLowerCase(),
      label: tag,
    }));
    const resultTags = await db.insert(tags).values(InputTags).returning();

    const EntryTagsInput = resultTags.map((tag) => ({
      entryId: result[0].id,
      tagId: tag.id,
    }));

    await db.insert(entryTags).values(EntryTagsInput);
  }
  return result[0];
};
