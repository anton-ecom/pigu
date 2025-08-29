import type { EntryRepository } from "~/domain/interfaces";
import type { entryItem } from "~/domain/entities/entry";
import { WError } from "@core/utils/WError";

type GetListResponseProp = {
  count: number;
  posts: entryItem[];
};
export class PostService {
  constructor(private entryRepository: EntryRepository) {}

  async getList(params: {
    pageNumber: number;
    pageSize: number;
  }): Promise<GetListResponseProp> {
    // Check if already exists

    try {
      const postList = await this.entryRepository.list({
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
      });

      return { count: postList.count, posts: postList.items };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new WError(
          {
            name: "ServiceError",
            cause: error,
            info: { params },
          },
          "Error in getting entries",
        );
      }

      throw new WError("ServiceError: Error in getting entries");
    }
  }

  async getItem(id: string): Promise<entryItem | null> {
    try {
      const post = await this.entryRepository.getById(id);
      return post;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new WError(
          {
            name: "ServiceError",
            cause: error,
            info: { id },
          },
          "Error in getting entry",
        );
      }

      throw new WError("ServiceError: Error in getting entry");
    }
  }
}
