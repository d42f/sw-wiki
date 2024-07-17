export interface IComment {
  id: string;
  text: string;
  date: string;
}

export type IRawComment = Omit<IComment, 'id' | 'date'>;
