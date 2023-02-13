import {Request, Response} from 'express';
import * as core from 'express-serve-static-core';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import { MovieCardServiceInterface } from './movie-card-service.interface.js';
import { fillDTO } from '../../utils/common.js';
import MovieCardResponse from './response/movie-card.response.js';
import CreateMovieCardDto from './dto/create-movie-card.dto.js';
import MovieCardDetailsResponse from './response/movie-card-detail.response.js';
import UpdateMovieCardDto from './dto/update-movie-card.dto.js';
import { RequestQuery } from '../../types/request-query.type.js';
import CommentResponse from '../comment/response/comment.response.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { FavoriteFilmServiceInterface } from '../favorite-film/favorite-film.service.interface.js';


type ParamsGetMovieCard= {
  movieCardId: string;
}

type ParamsGetGenre = {
  genre: string;
}
 @injectable()
export default class MovieCardController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.MovieCardServiceInterface) private readonly movieCardService: MovieCardServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.FavoriteFilmServiceInterface) private readonly favoriteFilmService: FavoriteFilmServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for MovieCardController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateMovieCardDto)]
    });
    this.addRoute({path: '/genre/:genre', method: HttpMethod.Get , handler: this.getFilmsByGenre});
    this.addRoute({
      path: '/promo',
      method: HttpMethod.Get,
      handler: this.getPromo,
    });
    this.addRoute({
      path: '/:movieCardId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('movieCardId'),
        new DocumentExistsMiddleware(this.movieCardService, 'MovieCard', 'movieCardId'),
      ]
    });
    this.addRoute({
      path: '/:movieCardId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('movieCardId'),
        new DocumentExistsMiddleware(this.movieCardService, 'MovieCard', 'movieCardId'),
      ]
    });
    this.addRoute({path: '/:movieCardId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('movieCardId'),
        new DocumentExistsMiddleware(this.movieCardService, 'MovieCard', 'movieCardId'),
      ]
    });
    this.addRoute({path: '/:movieCardId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('movieCardId'),
        new DocumentExistsMiddleware(this.movieCardService, 'MovieCard', 'movieCardId'),
      ]
    });
    this.addRoute({
      path: '/favorite/:userId',
      method: HttpMethod.Get,
      handler: this.getFavoriteFilms,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const films = await this.movieCardService.find();
    this.ok(res, fillDTO(MovieCardResponse, films));
  }

  public async create( req: Request<Record<string, unknown>, Record<string, unknown>, CreateMovieCardDto>,
    res: Response
  ): Promise<void> {
    const{body, user} = req;
    const result = await this.movieCardService.create({...body, userId: user.id});
    const film = await this.movieCardService.findById(result.id);
    this.created(res, fillDTO(MovieCardResponse, film));
  }

  public async show(
    {params}: Request<core.ParamsDictionary | ParamsGetMovieCard>,
    res: Response
  ): Promise<void> {
    const {movieCardId} = params;
    const film = await this.movieCardService.findById(movieCardId);

    this.ok(res, fillDTO(MovieCardDetailsResponse, film));
  }

  public async delete(
    {params}: Request<core.ParamsDictionary | ParamsGetMovieCard>,
    res: Response
  ): Promise<void> {
    const {movieCardId} = params;
    const film = await this.movieCardService.deleteById(movieCardId);
    await this.favoriteFilmService.deleteByMovieCardId(movieCardId);
    await this.commentService.deleteByOfferId(movieCardId);
    this.noContent(res, film);
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetMovieCard, Record<string, unknown>, UpdateMovieCardDto>,
    res: Response
  ): Promise<void> {
    const film = await this.movieCardService.updateById(params.movieCardId, body);

    this.ok(res, fillDTO(MovieCardResponse, film));
  }

  public async getFilmsByGenre(
    {params, query}: Request<core.ParamsDictionary | ParamsGetGenre, unknown, unknown, RequestQuery>,
    res: Response):
    Promise<void>{
    const films = await this.movieCardService.findByGenre(params.genre, query.limit);
    this.ok(res, fillDTO(MovieCardResponse, films));
  }

  public async getPromo(_req: Request, res: Response): Promise<void>
  {
    const promo = await this.movieCardService.findPromo();
    this.ok(res, fillDTO(MovieCardResponse, promo));
  }

  public async getComments(
    {params}: Request<core.ParamsDictionary | ParamsGetMovieCard, object, object>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findByMovieCardId(params.movieCardId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }

  public async getFavoriteFilms(
    req: Request,
    res: Response
  ): Promise<void> {
    const userId = req.user.id;
    const favoriteFilms = await this.favoriteFilmService.findByUserId(userId);
    this.ok(res, fillDTO(MovieCardResponse, favoriteFilms.map((item) => item.movieCardId)));
    console.log(favoriteFilms.map((item) => item.movieCardId));
  }
}

