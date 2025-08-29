import type { UserRepository } from "~/domain/interfaces";
import type { userItem } from "~/domain/entities";
import type { UserCreateInput } from "~/domain/dto";
import type { PrismaClient, User as userModel } from "~/database";
import { WError } from "@core/utils/WError";

export class UserRepositoryImpl implements UserRepository {
  constructor(private db: PrismaClient) {}

  /**
   *
   * @param params
   * @param params.pageNumber
   * @param params.pageSize
   * @returns
   * count: number;
   * entries: userItem[]
   */
  async list(params: {
    pageNumber: number;
    pageSize: number;
  }): Promise<{ count: number; items: userItem[] }> {
    try {
      const count = await this.db.user.count();

      const list = await this.db.user.findMany({
        skip: (params.pageNumber - 1) * params.pageSize,
        take: params.pageSize,
      });

      const itemsList = list.map((user) => ({
        ...this.toEntity(user),
      }));

      return {
        count,
        items: itemsList,
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

  async getById(id: string): Promise<userItem | null> {
    try {
      const record = await this.db.user.findUnique({
        where: { id: id },
      });
      if (!record) return null;

      return {
        ...this.toEntity(record),
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new WError(
          {
            name: "RepositoryError",
            cause: error,
            info: { id },
          },
          "Error in getting user",
        );
      }

      throw new WError("RepositoryError: Error in getting user");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.db.user.delete({ where: { id } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new WError(
          {
            name: "RepositoryError",
            cause: error,
            info: { id },
          },
          "Error in deleting user",
        );
      }

      throw new WError("RepositoryError: Error deleting user");
    }
  }

  async create(params: UserCreateInput): Promise<{ id: string }> {
    try {
      const { id } = await this.db.user.create({
        data: params,
      });

      if (!id) {
        throw new WError(
          {
            name: "RepositoryError",
            info: { params },
          },
          "Error creating user",
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
          "Error in creating user: Uknown error",
        );
      }

      throw new WError("RepositoryError: Error in creating user: Uknown error");
    }
  }

  toEntity(row: userModel) {
    return {
      id: row.id,
      email: row.email,
      name: row.name,
      bio: row.bio || null,
      image: row.image || null,
      linkedin: row.linkedIn || null,
    };
  }
}
