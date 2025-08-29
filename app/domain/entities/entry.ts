export interface entryItem {
  id: string;
  subtitle?: string | null;
  title: string;
  imageAlt?: string | null;
  tags?: string[] | null;
  text: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
  author: string;
}
