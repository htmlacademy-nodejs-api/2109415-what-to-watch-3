import { Expose, Type } from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';
import MovieCardResponse from '../../movie-card/response/movie-card.response.js';

export default class FavoriteFilmResponse {
  @Expose()
  public id!: string;


  @Expose({ name: 'createdAt'})
  public postDate!: string;

  @Expose({ name: 'movieCardId'})
  @Type(() => MovieCardResponse)
  public movieCardId!: string;

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;
}
