import { Staring } from './staring.type.js';
import { User } from './user.type.js';

export type MovieCard = {
  title: string,
  description: string,
  postDate: Date,
  genres: string[],
  released: string,
  previewVideoLink: string,
  videoLink: string,
  staring: Staring[],
  director: string,
  runTime: string,
  posterImage: string,
  backgroundImage: string,
  backgroundColor: string,
  user: User,
  }
