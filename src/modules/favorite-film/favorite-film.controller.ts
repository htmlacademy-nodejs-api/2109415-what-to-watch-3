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
      path: '/:movieCardId/:status',
      method: HttpMethod.Post,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
  }


  public async update (
    {params, user}: Request<core.ParamsDictionary | ParamsGetMovieCard, unknown, unknown, RequestQuery>,
    res: Response):
    Promise<void>{
    const {movieCardId, status} = params;
    if (status === '1') {
      const result = await this.favoriteFilmService.create({movieCardId: params.movieCardId, userId: user.id});
      this.created(res, fillDTO(FavoriteFilmResponse, result));
    } else{

      const favoriteFilmCardId = await this.favoriteFilmService.findIdByMovieCardIdAndUserId(movieCardId, user.id);
      if (favoriteFilmCardId){
        await this.favoriteFilmService.deleteById(favoriteFilmCardId);}
      this.noContent(res, favoriteFilmCardId);}
  }

}
