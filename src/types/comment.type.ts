import { User } from './user.type';

export type Comment = {
  text: string,
  rating: number,
  postDate: Date,
  user: User
}
