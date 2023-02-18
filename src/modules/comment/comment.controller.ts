import {Request, Response} from 'express';
import {inject} from 'inversify';
import * as core from 'express-serve-static-core';
import {StatusCodes} from 'http-status-codes';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {CommentServiceInterface} from './comment-service.interface.js';
// import CreateCommentDto from './dto/create-comment.dto.js';
import HttpError from '../../common/errors/http-error.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {fillDTO} from '../../utils/common.js';
import CommentResponse from './response/comment.response.js';
import { MovieCardServiceInterface } from '../movie-card/movie-card-service.interface.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
// import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';

type ParamsGetMovieCard= {
  movieCardId: string;
}

type NewReview= {
  text: string;
  rating: number;
}

export default class CommentController extends Controller {
  constructor(
     @inject(Component.LoggerInterface) logger: LoggerInterface,
     @inject(Component.ConfigInterface) configService: ConfigInterface,
     @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
     @inject(Component.MovieCardServiceInterface) private readonly movieCardService: MovieCardServiceInterface,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/:movieCardId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        // new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
    this.addRoute({
      path: '/:movieCardId',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new DocumentExistsMiddleware(this.movieCardService, 'MovieCard', 'movieCardId'),
      ]
    });
  }

  public async create(
    req: Request<core.ParamsDictionary | ParamsGetMovieCard, object, NewReview>,
    res: Response
  ): Promise<void> {

    const {body, params} = req;
    console.log(body, params);
    if (!await this.movieCardService.exists(params.movieCardId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Film with id ${params.movieCardId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create({...body, movieCardId: params.movieCardId ,userId: req.user.id},);
    await this.movieCardService.incCommentCount(params.movieCardId, body.rating);
    this.created(res, fillDTO(CommentResponse, comment));
  }

  public async getComments(
    {params}: Request<core.ParamsDictionary | ParamsGetMovieCard, object, object>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findByMovieCardId(params.movieCardId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }
}
