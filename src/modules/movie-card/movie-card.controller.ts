import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import { MovieCardServiceInterface } from './movie-card-service.interface.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../utils/common.js';
import MovieCardResponse from './response/movie-card.response.js';
import CreateMovieCardDto from './dto/create-movie-card.dto.js';

 @injectable()
export default class MovieCardController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.MovieCardServiceInterface) private readonly movieCardService: MovieCardServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for MovieCardController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const films = await this.movieCardService.find();
    const movieCardResponse = fillDTO(MovieCardResponse, films);
    this.send(res, StatusCodes.OK, movieCardResponse);
  }


  public async create( {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateMovieCardDto>,
    res: Response
  ): Promise<void> {const result = await this.movieCardService.create(body);
    const film = await this.movieCardService.findById(result.id);
    this.created(res, fillDTO(MovieCardResponse, film));
  }
}
