import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Film } from '../types/film';
import { Review } from '../types/review';
import { NewReview } from '../types/new-review';
import { AuthData } from '../types/auth-data';
import { Token } from '../types/token';
import { NewFilm } from '../types/new-film';
import { APIRoute, DEFAULT_GENRE, NameSpace } from '../const';
import { User } from '../types/user';
import { NewUser } from '../types/new-user';
import { dropToken, saveToken } from '../services/token';
import { adaptCommentToClient, adaptCommentsToClient, adaptMovieCardDetailsToClient, adaptMovieCardsToClient, adaptUserToClient } from '../utils/adapters/adaptersToClient';
import MovieCardDetailsDto from '../dto/movie-card/movie-card-detail.dto';
import { adaptCreateCommentToServer, adaptCreateFilmToServer, adaptEditFilmToServer } from '../utils/adapters/adaptersToServer';
import CommentDto from '../dto/comment/comment.dto';
import UserDto from '../dto/user/user.dto';

type Extra = {
  api: AxiosInstance;
};

export const fetchFilms = createAsyncThunk<Film[], undefined, { extra: Extra }>(
  `${NameSpace.Films}/fetchFilms`,
  async (_arg, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<MovieCardDetailsDto[]>(APIRoute.Films);

    return adaptMovieCardsToClient(data);
  }
);

export const fetchFilmsByGenre = createAsyncThunk<
  Film[],
  string,
  { extra: Extra }
>(`${NameSpace.Genre}/fetchFilmsByGenre`, async (genre, { extra }) => {
  const { api } = extra;
  let route = `${APIRoute.Genre}/${genre}`;
  if (genre === DEFAULT_GENRE) {
    route = APIRoute.Films;
  }
  const { data } = await api.get<MovieCardDetailsDto[]>(route);

  return adaptMovieCardsToClient(data);
});

export const fetchFilm = createAsyncThunk<Film, string, { extra: Extra }>(
  `${NameSpace.Film}/fetchFilm`,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<MovieCardDetailsDto>(`${APIRoute.Films}/${id}`);
    return adaptMovieCardDetailsToClient(data);
  }
);

export const editFilm = createAsyncThunk<Film, Film, { extra: Extra }>(
  `${NameSpace.Film}/editFilm`,
  async (filmData, { extra }) => {
    const { api } = extra;
    const { data } = await api.patch<MovieCardDetailsDto>(
      `${APIRoute.Films}/${filmData.id}`,
      adaptEditFilmToServer(filmData)
    );

    return adaptMovieCardDetailsToClient(data);
  }
);

export const addFilm = createAsyncThunk<Film, NewFilm, { extra: Extra }>(
  `${NameSpace.Film}/addFilm`,
  async (filmData, { extra }) => {
    const { api } = extra;
    const { data } = await api.post<MovieCardDetailsDto>(APIRoute.Films, adaptCreateFilmToServer(filmData));

    return adaptMovieCardDetailsToClient(data);
  }
);

export const deleteFilm = createAsyncThunk<Film, string, { extra: Extra }>(
  `${NameSpace.Film}/deleteFilm`,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.delete<MovieCardDetailsDto>(`${APIRoute.Films}/${id}`);

    return adaptMovieCardDetailsToClient(data);
  }
);

export const fetchReviews = createAsyncThunk<
  Review[],
  string,
  { extra: Extra }
>(`${NameSpace.Reviews}/fetchReviews`, async (id, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<CommentDto[]>(`${APIRoute.Comments}/${id}`);

  return adaptCommentsToClient(data);
});

export const postReview = createAsyncThunk<
  Review,
  { id: Review['id']; review: NewReview },
  { extra: Extra }
>(`${NameSpace.Reviews}/postReview`, async ({ id, review }, { extra }) => {
  const { api } = extra;
  const { data } = await api.post<CommentDto>(`${APIRoute.Comments}/${id}`, adaptCreateCommentToServer(review));

  return adaptCommentToClient(data);
});

export const checkAuth = createAsyncThunk<User, undefined, { extra: Extra }>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { extra }) => {
    const { api } = extra;
    try {
      const { data } = await api.get<UserDto>(APIRoute.Login);
      return adaptUserToClient(data);
    } catch (error) {
      dropToken();
      return Promise.reject(error);
    }
  }
);

export const login = createAsyncThunk<User, AuthData, { extra: Extra }>(
  `${NameSpace.User}/login`,
  async (authData, { extra }) => {
    const { api } = extra;

    const { data } = await api.post<UserDto & { token: Token }>(
      APIRoute.Login,
      authData
    );
    const { token } = data;
    saveToken(token);

    return adaptUserToClient(data);
  }
);

export const logout = createAsyncThunk<void, undefined, { extra: Extra }>(
  `${NameSpace.User}/logout`,
  async (_arg, { extra }) => {
    const { api } = extra;
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const fetchFavoriteFilms = createAsyncThunk<
  Film[],
  undefined,
  { extra: Extra }
>(`${NameSpace.FavoriteFilms}/fetchFavoriteFilms`, async (_arg, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<MovieCardDetailsDto[]>(APIRoute.Favorite);
  return adaptMovieCardsToClient(data);
});

export const fetchPromo = createAsyncThunk<Film, undefined, { extra: Extra }>(
  `${NameSpace.Promo}/fetchPromo`,
  async (_arg, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<MovieCardDetailsDto>(APIRoute.Promo);

    return adaptMovieCardDetailsToClient(data);
  }
);

export const setFavorite = createAsyncThunk<Film, Film['id'], { extra: Extra }>(
  `${NameSpace.FavoriteFilms}/setFavorite`,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.post<MovieCardDetailsDto>(`${APIRoute.Favorite}/${id}`);

    return adaptMovieCardDetailsToClient(data);
  }
);

export const unsetFavorite = createAsyncThunk<
  Film,
  Film['id'],
  { extra: Extra }
>(`${NameSpace.FavoriteFilms}/unsetFavorite`, async (id, { extra }) => {
  const { api } = extra;
  const { data } = await api.delete<MovieCardDetailsDto>(`${APIRoute.Favorite}/${id}`);

  return adaptMovieCardDetailsToClient(data);
});

export const registerUser = createAsyncThunk<void, NewUser, { extra: Extra }>(
  `${NameSpace.User}/register`,
  async ({ email, password, name, avatar }, { extra }) => {
    const { api } = extra;
    const { data } = await api.post<{ id: string }>(APIRoute.Register, {
      email,
      password,
      name,
    });
    if (avatar) {
      const payload = new FormData();
      payload.append('avatar', avatar);
      await api.post(`users/${data.id}${APIRoute.Avatar}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
  }
);
