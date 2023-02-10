import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import {Component} from '../../types/component.types.js';
import { FavoriteFilmServiceInterface } from './favorite-film.service.interface.js';
import CreateFavoriteFilmDto from './dto/create-favorite-film.dto.js';
import { FavoriteFilmEntity } from './favorite-film.entity.js';

 @injectable()
export default class FavoriteFilmService implements FavoriteFilmServiceInterface{
  constructor(
     @inject(Component.FavoriteFilmModel) private readonly FavoriteFilmModel: types.ModelType<FavoriteFilmEntity>
  ) {}

  public async create(dto: CreateFavoriteFilmDto): Promise<DocumentType<FavoriteFilmEntity>> {
    const comment = await this.FavoriteFilmModel.create(dto);
    return comment.populate(['userId', 'movieCardId']);
  }

  public async findByUserId(userId: string): Promise<DocumentType<FavoriteFilmEntity>[]> {
    return this.FavoriteFilmModel
      .find({userId})
      .populate(['userId', 'movieCardId']);
  }

  public async deleteByMovieCardId(movieCardId: string): Promise<number> {
    const result = await this.FavoriteFilmModel
      .deleteMany({movieCardId})
      .exec();

    return result.deletedCount;
  }
}
