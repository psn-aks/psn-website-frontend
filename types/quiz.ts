export type Topic = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
};

export type Question = {
  _id: string;
  question: string;
  topic_slug: string;
  options: string[];
  correct_index: number;
};
