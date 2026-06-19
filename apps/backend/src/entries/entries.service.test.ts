import { describe, expect, it, vi } from "vitest";
import { createEntry } from "./entries.service";

const userId = "user-1";

describe("entryService", () => {
  describe("createEntry", () => {
    //test 1
    it("returns the created entry", async () => {
      const mockDb = {
        insert: vi.fn().mockReturnValue({
          values: vi.fn().mockReturnValue({
            returning: vi.fn().mockResolvedValue([
              {
                id: "entry-1",
                type: "text",
                content: "very important bookmark",
                title: "the first entry",
                userId: "user-1",
                createdAt: new Date(),
              },
            ]),
          }),
        }),
      };

      const input = {
        type: "text",
        content: "very important bookmark",
        title: "the first entry",
        userId: "user-1",
      };

      const result = await createEntry(mockDb, input);

      expect(result.id).toBe("entry-1");
      expect(result.type).toBe("text");
      expect(result.content).toBe("very important bookmark");
    });

    //test 2
    it("it returns the tag", async () => {
      const mockDb = {
        insert: vi.fn().mockReturnValue({
          values: vi.fn().mockReturnValue({
            returning: vi.fn().mockResolvedValue([
              {
                id: "tag-1",
                type: "link",
                content: "very important bookmark",
                title: "the first tag",
                userId: "user-1",
                createdAt: new Date(),
              },
            ]),
          }),
        }),
      };

      const input = {
        tags: ["java"],
        type: "link",
        content: "very import bookmark",
      };

      const result = await createEntry(mockDb, input, userId);

      expect(mockDb.insert).toBeCalledTimes(3);
    });

    //test 3
    it("it returns the entry tag", async () => {
      const input = {
        tags: ["java"],
        type: "link",
        content: "very import bookmark",
      };

      const mockDb = {
        insert: vi.fn().mockReturnValue({
          values: vi.fn().mockReturnValue({
            returning: vi.fn().mockResolvedValue([
              {
                id: "tag-1",
                type: "link",
                content: "very important bookmark",
                title: "the first tag",
                userId: "user-1",
                createdAt: new Date(),
              },
            ]),
          }),
        }),
      };

      const result = await createEntry(mockDb, input, userId);

      expect(mockDb.insert).toBeCalledTimes(3);
    });
  });
});
