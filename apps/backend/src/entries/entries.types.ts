import * as z from "zod";

export const CreateEntrySchema = z.object({
  title: z.string().optional(),
  content: z.string().min(4),
  type: z.enum([
    "text",
    "link",
    "video",
    "x-bookmark",
    "note",
    "voice",
    "code",
    "image",
    "file",
  ]),
  tags: z.array(z.string()).optional(),
});

export type CreateEntryInput = z.infer<typeof CreateEntrySchema>;
