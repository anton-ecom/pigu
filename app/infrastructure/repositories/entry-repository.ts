import type { EntryRepository } from "~/domain/interfaces";
import type { entryItem } from "~/domain/entities";
import type { EntryCreateInput } from "~/domain/dto";
import type { PrismaClient, Entry as entryModel } from "~/database";
import { WError } from "@core/utils/WError";

export class EntryRepositoryImpl implements EntryRepository {
  constructor(private db: PrismaClient) {}

  async getByName(title: string): Promise<entryItem | null> {
    try {
      const record = await this.db.entry.findUnique({
        where: { title: title },
        include: {
          user: {
            select: { name: true },
          },
        },
      });

      if (!record) return null;

      return {
        ...this.toEntity(record),
        author: record.user?.name,
      };
    } catch (error: unknown) {
      if (error instanceof WError) {
        throw new WError(
          {
            name: "RepositoryError",
            cause: error,
            info: { title },
          },
          "Entry not exist",
        );
      }
      throw new WError("RepositoryError: Entry not exist");
    }
  }

  /**
   *
   * @param params
   * @param params.pageNumber
   * @param params.pageSize
   * @returns
   * count: number;
   * entries: entryItem[]
   */
  async list(params: {
    pageNumber: number;
    pageSize: number;
  }): Promise<{ count: number; items: entryItem[] }> {
    try {
      const count = await this.db.entry.count();

      const entries = await this.db.entry.findMany({
        skip: (params.pageNumber - 1) * params.pageSize,
        take: params.pageSize,
        include: {
          user: {
            select: { name: true },
          },
        },
      });

      const entriesList = entries.map((entry) => ({
        ...this.toEntity(entry),
        author: entry.user?.name,
      }));

      return {
        count,
        items: entriesList,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new WError(
          {
            name: "RepositoryError",
            cause: error,
            info: { params },
          },
          "Error in getting entries",
        );
      }

      throw new WError("RepositoryError: Error in getting entries");
    }
  }

  async getById(id: string): Promise<entryItem | null> {
    try {
      const record = await this.db.entry.findUnique({
        where: { id: id },
        include: {
          user: {
            select: { name: true },
          },
        },
      });
      if (!record) return null;

      return {
        ...this.toEntity(record),
        author: record.user?.name,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new WError(
          {
            name: "RepositoryError",
            cause: error,
            info: { id },
          },
          "Error in getting entry",
        );
      }

      throw new WError("RepositoryError: Error in getting entry");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.db.entry.delete({ where: { id } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new WError(
          {
            name: "RepositoryError",
            cause: error,
            info: { id },
          },
          "Error in deleting entry",
        );
      }

      throw new WError("RepositoryError: Error deleting entry");
    }
  }

  async create(params: EntryCreateInput): Promise<{ id: string }> {
    try {
      const { id } = await this.db.entry.create({
        data: params,
      });

      if (!id) {
        throw new WError(
          {
            name: "RepositoryError",
            info: { params },
          },
          "Error creating entry",
        );
      }

      return {
        id,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new WError(
          {
            name: "RepositoryError",
            info: { params },
            cause: error,
          },
          "Error in creating entry: Uknown error",
        );
      }

      throw new WError(
        "RepositoryError: Error in creating entry: Uknown error",
      );
    }
  }

  toEntity(entry: entryModel) {
    return {
      id: entry.id,
      title: entry.title,
      subtitle: entry.subtitle || "",
      text: entry.text,
      image: entry.image || "",
      imageAlt: entry.imageAlt || "",
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
      tags: entry.tags || [],
      userId: entry.userId,
    };
  }
}
