import { DocumentType } from '@typegoose/typegoose';
import CreateMovieCardDto from './dto/create-movie-card.dto';
import { MovieCardEntity } from './movie-card.entity';
import UpdateMovieCardDto from './dto/update-movie-card.dto';

export interface MovieCardServiceInterface {
  create(dto: CreateMovieCardDto): Promise<DocumentType<MovieCardEntity>>;
  findById(movieCardId: string): Promise<DocumentType<MovieCardEntity> | null>;
  updateById(movieCardId: string, dto: UpdateMovieCardDto): Promise<DocumentType<MovieCardEntity> | null>;
  deleteById(movieCardId: string): Promise<DocumentType<MovieCardEntity> | null>;
  find(): Promise<DocumentType<MovieCardEntity>[]>;
  findByGenre(genre: string): Promise<DocumentType<MovieCardEntity>[]>;
  findPromo(): Promise<DocumentType<MovieCardEntity> | null>;
  findFavorite(): Promise<DocumentType<MovieCardEntity>[]>;
  addToDeleteFromFavorite(movieCardId: string, isFavoriteFlag: number): Promise<DocumentType<MovieCardEntity> | null>;
  exists(documentId: string): Promise<boolean>;
  incCommentCount(movieCardId: string, rating: number): Promise<DocumentType<MovieCardEntity> | null>;
}
