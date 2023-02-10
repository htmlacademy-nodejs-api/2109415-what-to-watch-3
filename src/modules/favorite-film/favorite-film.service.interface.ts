import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import CreateFavoriteFilmDto from './dto/create-favorite-film.dto.js';
import { FavoriteFilmEntity } from './favorite-film.entity.js';

export interface FavoriteFilmServiceInterface {
  create(dto: CreateFavoriteFilmDto): Promise<DocumentType<FavoriteFilmEntity>>;
  findByUserId(userId: string): Promise<DocumentType<FavoriteFilmEntity>[]>;
  deleteByMovieCardId(movieCardId: string): Promise<number | null>;
}
