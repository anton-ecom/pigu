import { describe, it, expect, vi, beforeEach } from "vitest";
import { PostService } from "~/services/post-service.server";
import type { entryItem } from "~/domain/entities/entry";
import { WError } from "@core/utils/WError";
import type { EntryRepository } from "~/domain/interfaces/entry-repository";

describe("PostService", () => {
  let postService: PostService;
  let mockList: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockList = vi.fn();
    const mockRepo = {
      list: mockList,
      getById: mockList,
      getByName: mockList,
      create: mockList,
      delete: mockList,
    };
    postService = new PostService(mockRepo as EntryRepository);
  });

  it("should return posts and count from repository", async () => {
    const mockEntries: entryItem[] = [
      {
        id: "1",
        title: "Test",
        subtitle: "",
        text: "",
        image: "",
        imageAlt: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: [],
        userId: "u1",
        author: "Author 1",
      },
    ];
    mockList.mockResolvedValueOnce({ count: 1, entries: mockEntries });

    const result = await postService.getList({ pageNumber: 1, pageSize: 10 });

    expect(result.count).toBe(1);
    expect(result.posts).toEqual(mockEntries);
    expect(mockList).toHaveBeenCalledWith({ pageNumber: 1, pageSize: 10 });
  });

  it("should throw WError on repository error", async () => {
    mockList.mockRejectedValueOnce(
      new WError(
        {
          name: "TestError",
          info: { info: "test" },
        },
        "DB error",
      ),
    );

    await expect(
      postService.getList({ pageNumber: 1, pageSize: 10 }),
    ).rejects.toThrow("Error in getting entries");
  });
});
