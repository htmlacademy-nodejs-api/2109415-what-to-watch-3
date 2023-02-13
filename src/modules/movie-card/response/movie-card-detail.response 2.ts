import { Expose, Type } from 'class-transformer';
import { Staring } from '../../../types/staring.type';
import UserResponse from '../../user/response/user.response.js';

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
  public genre!: string;

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

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!:UserResponse;

  @Expose()
  public posterImage!: string;

  @Expose()
  public backgroundImage!: string;

  @Expose()
  public backgroundColor!: string;

  @Expose()
  public commentCount!:number;
}
