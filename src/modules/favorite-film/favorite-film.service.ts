import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import {Component} from '../../types/component.types.js';
import { FavoriteFilmServiceInterface } from './favorite-film.service.interface.js';
import CreateFavoriteFilmDto from './dto/create-favorite-film.dto.js';
import { FavoriteFilmEntity } from './favorite-film.entity.js';

 @injectable()
export default class FavoriteFilmService implements FavoriteFilmServiceInterface{
  constructor(
     @inject(Component.FavoriteFilmModel) private readonly favoriteFilmModel: types.ModelType<FavoriteFilmEntity>
  ) {}

  public async create(dto: CreateFavoriteFilmDto): Promise<DocumentType<FavoriteFilmEntity>> {
    const comment = await this.favoriteFilmModel.create(dto);
    return comment.populate(['userId', 'movieCardId']);
  }

  public async findByUserId(userId: string): Promise<DocumentType<FavoriteFilmEntity>[]> {
    return this.favoriteFilmModel
      .find({userId})
      .populate(['userId', 'movieCardId']);
  }

  public async findIdByMovieCardIdAndUserId(movieCardId: string, userId: string): Promise<string | null >{
    const favoriteFilm = await this.favoriteFilmModel
      .findOne({movieCardId: movieCardId, userId: userId})
      .exec();
    if (!favoriteFilm) {
      return null;
    }
    return favoriteFilm._id.toString();
  }

  public async deleteById(objectId: string): Promise<DocumentType<FavoriteFilmEntity> | null>{
    return this.favoriteFilmModel
      .findByIdAndDelete(objectId)
      .exec();
  }

  public async deleteByMovieCardId(movieCardId: string): Promise<number> {
    const result = await this.favoriteFilmModel
      .deleteMany({movieCardId})
      .exec();

    return result.deletedCount;
  }


}
