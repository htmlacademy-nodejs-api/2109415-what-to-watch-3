import CommentDto from '../../dto/comment/comment.dto';
import MovieCardDetailsDto from '../../dto/movie-card/movie-card-detail.dto';
import UserWithTokenDto from '../../dto/user/user-with-token.dto';
import UserDto from '../../dto/user/user.dto';
import { Film } from '../../types/film';
import { Review } from '../../types/review';
import { User } from '../../types/user';

export const adaptUserToClient =
   (user: UserDto): User => ({
     name: user.name,
     email: user.email,
     avatarUrl: user.avatarPath,
   });

export const adaptLoginToClient =
   (user: UserWithTokenDto): User => ({
     email: user.email,
     name: user.name,
     avatarUrl: user.avatarPath,
     token: user.token,
   });


export const adaptMovieCardDetailsToClient =
(film: MovieCardDetailsDto): Film => ({
  id: film.id,
  name: film.title,
  posterImage: film.posterImage,
  backgroundImage: film.backgroundImage,
  backgroundColor: film.backgroundColor,
  videoLink: film.videoLink,
  previewVideoLink: film.previewVideoLink,
  description: film.description,
  rating: film.rating,
  director: film.director,
  starring: [film.staring],
  runTime: film.runTime,
  genre: film.genre,
  released: film.released,
  isFavorite: false,
  user: adaptUserToClient(film.user),
});

export const adaptMovieCardsToClient =
(films: MovieCardDetailsDto[]): Film[] =>
  films.filter((film: MovieCardDetailsDto) => film.user !== null,)
    .map((film: MovieCardDetailsDto) => ({
      id: film.id,
      name: film.title,
      posterImage: film.posterImage,
      backgroundImage: film.backgroundImage,
      backgroundColor: film.backgroundColor,
      videoLink: film.videoLink,
      previewVideoLink: film.previewVideoLink,
      description: film.description,
      rating: film.rating,
      director: film.director,
      starring: [film.staring],
      runTime: film.runTime,
      genre: film.genre,
      released: film.released,
      isFavorite: false,
      user: adaptUserToClient(film.user),
    }));

export const adaptCommentsToClient =
(comments: CommentDto[]): Review[] =>
  comments.filter((comment: CommentDto) => comment.user !== null,)
    .map((comment: CommentDto) => ({
      comment: comment.text,
      id: comment.id,
      date: comment.postDate,
      rating: comment.rating,
      user: adaptUserToClient(comment.user),
    }));

export const adaptCommentToClient =
(comment: CommentDto): Review =>({
  comment: comment.text,
  id: comment.id,
  date: comment.postDate,
  rating: comment.rating,
  user: adaptUserToClient(comment.user),
});
