export interface userItem {
  id: string;
  name: string;
  email: string;
  bio?: string | null;
  linkedIn?: string | null;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
