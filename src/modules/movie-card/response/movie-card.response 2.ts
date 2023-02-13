import { Expose, Type } from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';

export default class MovieCardResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public released!: string;

  @Expose()
  public genre!: string;

  @Expose()
  public previewVideoLink!: string;

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!:UserResponse;

  @Expose()
  public posterImage!: string;

  @Expose()
  public commentCount!:number;
}
