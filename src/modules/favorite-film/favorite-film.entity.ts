import typegoose, {getModelForClass, Ref, defaultClasses} from '@typegoose/typegoose';
import {UserEntity} from '../user/user.entity.js';
import { MovieCardEntity } from '../movie-card/movie-card.entity.js';

const {prop, modelOptions} = typegoose;

export interface FavoriteFilmEntity extends defaultClasses.Base {}

 @modelOptions({
   schemaOptions: {
     collection: 'favoriteFilms'
   }
 })
export class FavoriteFilmEntity extends defaultClasses.TimeStamps {

  @prop({
    ref: MovieCardEntity,
    required: true
  })
  public movieCardId!: Ref<MovieCardEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;
}

export const FavoriteFilmModel = getModelForClass(FavoriteFilmEntity);
