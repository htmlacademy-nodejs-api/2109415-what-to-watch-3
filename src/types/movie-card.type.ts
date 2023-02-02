import { GenreType } from './genre-type.enum.js';
import { User } from './user.type.js';

export type MovieCard = {
  title: string,
  description: string,
  postDate: Date,
  genre: GenreType,
  released: number,
  previewVideoLink: string,
  videoLink: string,
  staring: string,
  director: string,
  runTime: number,
  posterImage: string,
  backgroundImage: string,
  backgroundColor: string,
  user: User,
  }
