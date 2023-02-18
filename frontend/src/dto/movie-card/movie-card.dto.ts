import UserDto from '../user/user.dto.js';

export default class MovieCardDto {
  public id!: string;

  public title!: string;

  public released!: string;

  public genre!: string;

  public previewVideoLink!: string;

  public user!:UserDto;

  public posterImage!: string;

  public commentCount!:number;
}
