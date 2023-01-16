import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import { Genre } from '../../types/genre-type.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { Staring } from '../../types/staring.type.js';

const {prop, modelOptions} = typegoose;

export interface MovieCardEntity extends defaultClasses.Base {}

 @modelOptions({
   schemaOptions: {
     collection: 'movieCards'
   }
 })

export class MovieCardEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public postDate!: Date;

  @prop({
    type: () => String,
    enum: Genre
  })
  public type!: Genre;

  @prop()
  public released!: string;

  @prop()
  public rating!: string;

  @prop()
  public previewVideoLink!: string;

  @prop()
  public videoLink!: string;

  @prop()
  public staring!: Staring[];

  @prop()
  public runTime!: string;

  @prop()
  public posterImage!: string;

  @prop()
  public backgroundImage!: string;

  @prop()
  public director!: string;

  @prop({default: 0})
  public commentCount!:number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!:Ref<UserEntity>;

}


export const MovieCardModel = getModelForClass(MovieCardEntity);