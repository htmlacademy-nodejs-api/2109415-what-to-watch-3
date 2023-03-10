import { inject } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { FavoriteFilmServiceInterface } from './favorite-film.service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { RequestQuery } from '../../types/request-query.type.js';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { fillDTO } from '../../utils/common.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import MovieCardResponse from '../movie-card/response/movie-card.response.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { MovieCardServiceInterface } from '../movie-card/movie-card-service.interface.js';
import MovieCardDetailsResponse from '../movie-card/response/movie-card-detail.response.js';
import { IdCard } from '../../const.js';

type ParamsGetMovieCard= {
  movieCardId: string;
  status: number;
}

const checkingMiddlewares = [
  new PrivateRouteMiddleware(),
  new ValidateObjectIdMiddleware(IdCard.movieCardId),
];

export class FavoriteFilmController extends Controller {
  constructor(
  @inject(Component.LoggerInterface) logger: LoggerInterface,
  @inject(Component.ConfigInterface) configService: ConfigInterface,
  @inject(Component.FavoriteFilmServiceInterface) private readonly favoriteFilmService: FavoriteFilmServiceInterface,
  @inject(Component.MovieCardServiceInterface) private readonly movieCardService: MovieCardServiceInterface,
  ) {
    super(logger, configService);
    this.logger.info('Register routes for FavoriteFilmController');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.getFavoriteFilms,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });

    this.addRoute({
      path: `/:${IdCard.movieCardId}`,
      method: HttpMethod.Post,
      handler: this.setFavorite,
      middlewares: checkingMiddlewares
    });
    this.addRoute({
      path: `/:${IdCard.movieCardId}`,
      method: HttpMethod.Delete,
      handler: this.unSetFavorite,
      middlewares: checkingMiddlewares
    });
  }

  public async getFavoriteFilms(
    req: Request,
    res: Response
  ): Promise<void> {
    const {user} = req;
    const favoriteFilms = await this.favoriteFilmService.findByUserId(user.id);
    this.ok(res, fillDTO(MovieCardResponse, favoriteFilms.map((item) => item.movieCardId)));
  }

  public async setFavorite (
    {params, user}: Request<core.ParamsDictionary | ParamsGetMovieCard, unknown, unknown, RequestQuery>,
    res: Response):
    Promise<void>{
    await this.favoriteFilmService.create({movieCardId: params.movieCardId, userId: user.id});
    const film = await this.movieCardService.findById(params.movieCardId);
    const resultFilm = fillDTO(MovieCardDetailsResponse, film);
    resultFilm.isFavorite = true;
    this.created(res,resultFilm);
  }

  public async unSetFavorite (
    {params, user}: Request<core.ParamsDictionary | ParamsGetMovieCard, unknown, unknown, RequestQuery>,
    res: Response):
    Promise<void>{
    const favoriteFilmCardId = await this.favoriteFilmService.findIdByMovieCardIdAndUserId( params.movieCardId, user.id);
    if (favoriteFilmCardId){
      await this.favoriteFilmService.deleteById(favoriteFilmCardId);}
    const film = await this.movieCardService.findById(params.movieCardId);
    const resultFilm = fillDTO(MovieCardDetailsResponse, film);
    resultFilm.isFavorite = false;
    this.created(res,resultFilm);
  }
}
