import { DocumentType } from '@typegoose/typegoose';
import CreateMovieCardDto from './dto/create-movie-card.dto';
import { MovieCardEntity } from './movie-card.entity';

export interface MovieCardServiceInterface {
  create(dto: CreateMovieCardDto): Promise<DocumentType<MovieCardEntity>>;
  findById(movieCardId: string): Promise<DocumentType<MovieCardEntity> | null>;
}
