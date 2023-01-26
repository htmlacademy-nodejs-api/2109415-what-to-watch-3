import typegoose, {getModelForClass, Ref, defaultClasses} from '@typegoose/typegoose';
import {UserEntity} from '../user/user.entity.js';
import { MovieCardEntity } from '../movie-card/movie-card.entity.js';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

 @modelOptions({
   schemaOptions: {
     collection: 'comments'
   }
 })
export class CommentEntity extends defaultClasses.TimeStamps {

  @prop({trim: true, required: true})
  public text!: string;

   @prop({required: true})
  public rating!: number;

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

export const CommentModel = getModelForClass(CommentEntity);
