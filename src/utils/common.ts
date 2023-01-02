import { MovieCard} from '../types/movie-card.type.js';
import { Staring} from '../types/staring.type.js';
import { Genres} from '../types/genres.type.js';

export const createMovieCard = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, postDate, genres, released, rating, previewVideoLink, videoLink, staring, director, runTime, posterImage, backgroundImage, backgroundColor] = tokens;
  return {
    title,
    description,
    postDate: new Date(postDate),
    genres: <Genres[]>genres.split(';').map((genre) => ({ genre })),
    released,
    rating,
    previewVideoLink,
    videoLink,
    staring: <Staring[]>staring.split(';').map((name) => ({name})),
    director,
    runTime,
    posterImage,
    backgroundImage,
    backgroundColor
  } as MovieCard;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
