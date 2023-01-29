import { Expose } from 'class-transformer';
import { UserEntity } from '../../user/user.entity';
import { Ref } from '@typegoose/typegoose';
import { Staring } from '../../../types/staring.type';

export default class MovieCardDetailsResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: Date;

  @Expose()
  public genres!: string[];

  @Expose()
  public released!: string;

  @Expose()
  public rating!: number;

  @Expose()
  public previewVideoLink!: string;

  @Expose()
  public videoLink!: string;

  @Expose()
  public staring!: Staring[];

  @Expose()
  public director!: string;

  @Expose()
  public runTime!: string;

  @Expose()
  public userId!:Ref<UserEntity>;

  @Expose()
  public posterImage!: string;

  @Expose()
  public backgroundImage!: string;

  @Expose()
  public backgroundColor!: string;

  @Expose()
  public commentCount!:number;
}
