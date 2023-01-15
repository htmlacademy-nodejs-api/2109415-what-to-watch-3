import { Genre } from './genre-type.enum.js';
import { Staring } from './staring.type.js';
import { User } from './user.type.js';

export type MovieCard = {
  title: string,
  description: string,
  postDate: Date,
  genres: Genre,
  released: string,
  rating: string,
  previewVideoLink: string,
  videoLink: string,
  staring: Staring[],
  director: string,
  runTime: string,
  posterImage: string,
  backgroundImage: string,
  user: User,
  }
