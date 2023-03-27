export interface ToDo {
  id: number;
  title: string;
  description: string;
  completed?: boolean;
  imageUrl?: string;
  docId?: string;
  userId?: string;
}
