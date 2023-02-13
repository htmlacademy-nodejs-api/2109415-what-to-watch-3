import crypto from 'crypto';
import * as jose from 'jose';
import { MovieCard} from '../types/movie-card.type.js';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { ValidationErrorField } from '../types/validation-error-field.type.js';
import { ServiceError } from '../types/service-error.enum.js';

export const createMovieCard = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, postDate, genre, released, previewVideoLink, videoLink, staring, director, runTime, posterImage, backgroundImage, backgroundColor, email, avatarPath, name] = tokens;
  return {
    title,
    description,
    postDate: new Date(postDate),
    genre,
    released: Number.parseInt(released, 10),
    previewVideoLink,
    videoLink,
    staring: <string>staring.split(';').join(', '),
    director,
    runTime: Number.parseInt(runTime, 10),
    posterImage,
    backgroundImage,
    backgroundColor,
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

export const createErrorObject = (serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) => ({
  errorType: serviceError,
  message,
  details: [...details]
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algoritm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

export const transformErrors = (errors: ValidationError[]): ValidationErrorField[] =>
  errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
