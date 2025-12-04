export type Alternative = {
  id: number;
  alternative: string;
  main_software: string;
  category: string;
  description: string;
  link: string;
  added_by: string;
  upvotes: number;
  downvotes: number;
  created_at: string;   // ISO timestamps come as strings
  updated_at: string;
};
