export interface EntryCreateInput {
  title: string;
  subtitle?: string;
  imageAlt?: string;
  tags: string[];
  text: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
}
