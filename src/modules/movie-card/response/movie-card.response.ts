import { Expose } from 'class-transformer';
import { UserEntity } from '../../user/user.entity';
import { Ref } from '@typegoose/typegoose';

export default class MovieCardResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public released!: string;

  @Expose()
  public genres!: string[];

  @Expose()
  public previewVideoLink!: string;

  @Expose()
  public userId!:Ref<UserEntity>;

  @Expose()
  public posterImage!: string;

  @Expose()
  public commentCount!:number;
}
