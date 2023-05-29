export type Review = {
  id: string;
  title: string;
  text: string;
  date: string;
  read: boolean;
  rating: 1 | 2 | 3 | 4 | 5;
  author: string;
  reply: string | null;
};
