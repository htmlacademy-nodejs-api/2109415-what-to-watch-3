import UserResponse from '../user/user.dto';

export default class FavoriteFilmResponse {
  public id!: string;

  public postDate!: string;

  public movieCardId!: string;

  public user!: UserResponse;
}
