import { inject, injectable } from 'inversify';
import { MovieCardServiceInterface } from './movie-card-service.interface';
import { LoggerInterface } from '../../common/logger/logger.interface';
import { DocumentType, types } from '@typegoose/typegoose';
import { MovieCardEntity } from './movie-card.entity';
import CreateMovieCardDto from './dto/create-movie-card.dto';
import { Component } from '../../types/component.types.js';
import UpdateMovieCardDto from './dto/update-movie-card.dto';
import { MAXIMUM_FILMS_COUNT } from '../../const.js';


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
    return this.movieCardModel
      .findById(movieCardId)
      .populate(['userId'])
      .exec();
  }

  public async updateById (movieCardId: string, dto: UpdateMovieCardDto): Promise<DocumentType<MovieCardEntity> | null>{
    return this.movieCardModel
      .findByIdAndUpdate(movieCardId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async deleteById(movieCardId: string): Promise<DocumentType<MovieCardEntity> | null>{
    return this.movieCardModel
      .findByIdAndDelete(movieCardId)
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<MovieCardEntity>[]>{
    const limit = count ?? MAXIMUM_FILMS_COUNT ;
    return this.movieCardModel
      .find({}, {}, {limit})
      .populate(['userId'])
      .exec();
  }

  public async findByGenre(genre: string, count?: number): Promise<DocumentType<MovieCardEntity>[]>{
    const limit = count ?? MAXIMUM_FILMS_COUNT ;
    return this.movieCardModel
      .find({genre: genre}, {}, {limit})
      .populate(['userId'])
      .exec();
  }


  public async findPromo(): Promise<DocumentType<MovieCardEntity> | null>{
    return this.movieCardModel
      .findOne({isPromo: true})
      .exec();
  }

  public async findFavorite(): Promise<DocumentType<MovieCardEntity>[]>{
    return this.movieCardModel
      .find({isFavorite: true})
      .exec();
  }

  public async addToDeleteFromFavorite(movieCardId: string, isFavoriteFlag: number): Promise<DocumentType<MovieCardEntity> | null>{
    return this.movieCardModel
      .findByIdAndUpdate(movieCardId,{isFavorite: isFavoriteFlag}, {new: true} )
      .populate(['userId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.movieCardModel
      .exists({_id: documentId})) !== null;
  }

  public async incCommentCount(movieCardId: string, rating: number): Promise<DocumentType<MovieCardEntity> | null> {
    return this.movieCardModel
      .findByIdAndUpdate(movieCardId, [{'$inc': {
        commentCount: 1, totalRating: rating
      }},
      {'$set': {rating: { '$divide': ['$totalRating', '$commentCount']}}}]).exec();
  }
}
