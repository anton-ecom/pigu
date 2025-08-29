import type { entryItem } from "~/domain/entities";
import type { EntryCreateInput } from "~/domain/dto";

export interface EntryRepository {
  getById(id: string): Promise<entryItem | null>;
  getByName(name: string): Promise<entryItem | null>;
  create(params: EntryCreateInput): Promise<{ id: string }>;
  delete(id: string): Promise<void>;
  list(params: {
    pageNumber: number;
    pageSize: number;
  }): Promise<{ count: number; items: entryItem[] }>;
}
