import { IsMongoId} from 'class-validator';

export default class CreateFavoriteFilmDto {

  @IsMongoId({message: 'movieCardId field must be a valid id'})
  public movieCardId!: string;

  public userId!: string;
}

