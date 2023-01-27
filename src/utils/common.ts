import crypto from 'crypto';
import { MovieCard} from '../types/movie-card.type.js';
import { Staring} from '../types/staring.type.js';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export const createMovieCard = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, postDate, genres, released, rating, previewVideoLink, videoLink, staring, director, runTime, posterImage, backgroundImage, email, avatarPath, name] = tokens;
  return {
    title,
    description,
    postDate: new Date(postDate),
    genres: <string[]><unknown>genres.split(';').map((genre) => ({ genre })),
    released,
    rating,
    previewVideoLink,
    videoLink,
    staring: <Staring[]>staring.split(';').map((starName) => ({starName})),
    director,
    runTime,
    posterImage,
    backgroundImage,
    user: {email, avatarPath, name}
  } as MovieCard;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
