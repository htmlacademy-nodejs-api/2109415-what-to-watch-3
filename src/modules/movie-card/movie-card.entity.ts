import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';

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

  @prop()
  public genre!: string;

  @prop()
  public released!: number;

  @prop({default: 0})
  public totalRating!: number;

  @prop({default: 0})
  public rating!: number;

  @prop()
  public previewVideoLink!: string;

  @prop()
  public videoLink!: string;

  @prop()
  public staring!: string;

  @prop()
  public runTime!: number;

  @prop({default: ''})
  public posterImage!: string;

  @prop({default: ''})
  public backgroundImage!: string;

  @prop()
  public backgroundColor!: string;

  @prop()
  public director!: string;

  @prop({default: 0})
  public commentCount!:number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!:Ref<UserEntity>;

  @prop({default: false})
  public isPromo!: boolean;
}


export const MovieCardModel = getModelForClass(MovieCardEntity);
