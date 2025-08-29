import type { userItem } from "~/domain/entities";
import type { UserCreateInput } from "~/domain/dto";

export interface UserRepository {
  getById(id: string): Promise<userItem | null>;
  create(params: UserCreateInput): Promise<{ id: string }>;
  delete(id: string): Promise<void>;
  list(params: {
    pageNumber: number;
    pageSize: number;
  }): Promise<{ count: number; items: userItem[] }>;
}
