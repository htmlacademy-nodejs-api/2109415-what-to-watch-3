import CreateCommentDto from '../../dto/comment/create-comment.dto';
import CreateMovieCardDto from '../../dto/movie-card/create-movie-card.dto';
import UpdateMovieCardDto from '../../dto/movie-card/update-movie-card.dto';
import { Film } from '../../types/film';
import { NewFilm } from '../../types/new-film';
import { NewReview } from '../../types/new-review';
import { getTime } from '../utils';

export const adaptEditFilmToServer =
  (film: Film): UpdateMovieCardDto => ({
    title: film.name,
    description: film.description,
    genre: film.genre,
    released: film.released,
    previewVideoLink: film.previewVideoLink,
    videoLink: film.videoLink,
    staring: film.starring?.join(', '),
    director: film.description,
    runTime: film.runTime,
  });

export const adaptCreateFilmToServer =
  (film: NewFilm): CreateMovieCardDto => ({
    title: film.name,
    description: film.description,
    postDate:getTime(),
    genre: film.genre,
    released: film.released,
    previewVideoLink: film.previewVideoLink,
    videoLink: film.videoLink,
    staring: film.starring?.join(', '),
    director: film.description,
    backgroundColor: '',
    runTime: film.runTime,
  });

export const adaptCreateCommentToServer =
  (comment: NewReview): CreateCommentDto => ({
    text: comment.comment,
    rating: comment.rating,
  }) ;
