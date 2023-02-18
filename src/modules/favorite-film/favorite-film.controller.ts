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
import FavoriteFilmResponse from './response/favorite-film.response.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import MovieCardResponse from '../movie-card/response/movie-card.response.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';

type ParamsGetMovieCard= {
  movieCardId: string;
  status: number;
}

export class FavoriteFilmController extends Controller {
  constructor(
  @inject(Component.LoggerInterface) logger: LoggerInterface,
  @inject(Component.ConfigInterface) configService: ConfigInterface,
  @inject(Component.FavoriteFilmServiceInterface) private readonly favoriteFilmService: FavoriteFilmServiceInterface,
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
      path: '/:movieCardId',
      method: HttpMethod.Post,
      handler: this.setFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('movieCardId'),
      ]
    });
    this.addRoute({
      path: '/:movieCardId',
      method: HttpMethod.Delete,
      handler: this.unSetFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('movieCardId'),
      ]
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
    const result = await this.favoriteFilmService.create({movieCardId: params.movieCardId, userId: user.id});
    this.created(res, fillDTO(FavoriteFilmResponse, result));
  }

  public async unSetFavorite (
    {params, user}: Request<core.ParamsDictionary | ParamsGetMovieCard, unknown, unknown, RequestQuery>,
    res: Response):
    Promise<void>{
    const favoriteFilmCardId = await this.favoriteFilmService.findIdByMovieCardIdAndUserId( params.movieCardId, user.id);
    if (favoriteFilmCardId){
      await this.favoriteFilmService.deleteById(favoriteFilmCardId);}
    this.noContent(res, favoriteFilmCardId);}
}
