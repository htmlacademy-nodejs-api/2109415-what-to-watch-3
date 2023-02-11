import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import CreateFavoriteFilmDto from './dto/create-favorite-film.dto.js';
import { FavoriteFilmEntity } from './favorite-film.entity.js';

export interface FavoriteFilmServiceInterface {
  create(dto: CreateFavoriteFilmDto): Promise<DocumentType<FavoriteFilmEntity>>;
  findIdByMovieCardIdAndUserId(movieCardId: string, userId: string): Promise<string | null >;
  findByUserId(userId: string): Promise<DocumentType<FavoriteFilmEntity>[]>;
  deleteById(objectId: string): Promise<DocumentType<FavoriteFilmEntity> | null>;
  deleteByMovieCardId(movieCardId: string): Promise<number | null>;
}
