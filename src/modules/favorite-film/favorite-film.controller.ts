import { inject } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { FavoriteFilmServiceInterface } from './favorite-film.service.interface.js';
// import { MovieCardServiceInterface } from '../movie-card/movie-card-service.interface.js';
// import { UserServiceInterface } from '../user/user-service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { RequestQuery } from '../../types/request-query.type.js';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
// import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
// import CreateFavoriteFilmDto from './dto/create-favorite-film.dto.js';
import { fillDTO } from '../../utils/common.js';
import MovieCardResponse from '../movie-card/response/movie-card.response.js';
// import MovieCardResponse from '../movie-card/response/movie-card.response.js';

type ParamsGetMovieCard= {
  movieCardId: string;
}

export class FavoriteFilmController extends Controller {
  constructor(
  @inject(Component.LoggerInterface) logger: LoggerInterface,
  @inject(Component.FavoriteFilmServiceInterface) private readonly favoriteFilmService: FavoriteFilmServiceInterface,
  // @inject(Component.MovieCardServiceInterface) private readonly movieCardService: MovieCardServiceInterface,
  // @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for FavoriteFilmController');
    this.addRoute({
      path: '/:userId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
    this.addRoute({
      path: '/:movieCardId',
      method: HttpMethod.Post,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
  }

  public async show (req: Request,
    res: Response
  ): Promise<void> {

    const userId = req.user.id;
    const favoriteFilms = await this.favoriteFilmService.findByUserId(userId);
    this.ok(res, fillDTO(MovieCardResponse, favoriteFilms.map((item) => item.movieCardId)))
    console.log(favoriteFilms.map((item) => item.movieCardId));
  }

  public async update (
    {params, query, user}: Request<core.ParamsDictionary | ParamsGetMovieCard, unknown, unknown, RequestQuery>,
    _res: Response):
    Promise<void>{
    const result = await this.favoriteFilmService.create({movieCardId: params.movieCardId, userId: user.id})
    console.log(params, query, user, result);
    // this.ok(res, fillDTO(MovieCardResponse, film));
  }

}
