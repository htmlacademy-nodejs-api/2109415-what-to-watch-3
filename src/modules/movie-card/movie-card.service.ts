import { inject, injectable } from 'inversify';
import { MovieCardServiceInterface } from './movie-card-service.interface';
import { LoggerInterface } from '../../common/logger/logger.interface';
import { DocumentType, types } from '@typegoose/typegoose';
import { MovieCardEntity } from './movie-card.entity';
import CreateMovieCardDto from './dto/create-movie-card.dto';
import { Component } from '../../types/component.types.js';


@injectable()
export default class MovieCardService implements MovieCardServiceInterface{
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.MovieCardModel) private readonly movieCardModel: types.ModelType<MovieCardEntity>
  ) {}

  public async create(dto: CreateMovieCardDto): Promise<DocumentType<MovieCardEntity>> {
    const result = await this.movieCardModel.create(dto);
    this.logger.info(`New card created: ${dto.title}`);

    return result;
  }

  public async findById(movieCardId: string): Promise<DocumentType<MovieCardEntity> | null> {
    return this.movieCardModel.findById(movieCardId).exec();
  }

}
