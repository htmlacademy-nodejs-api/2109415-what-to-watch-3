import UserDto from '../user/user.dto';

export default class MovieCardDetailsDto{
  public id!: string;

  public title!: string;

  public description!: string;

  public postDate!: Date;

  public genre!: string;

  public released!: number;

  public rating!: number;

  public previewVideoLink!: string;

  public videoLink!: string;

  public staring!: string;

  public director!: string;

  public runTime!: number;

  public user!:UserDto;

  public posterImage!: string;

  public backgroundImage!: string;

  public backgroundColor!: string;

  public commentCount!: number;

  public isFavorite!: boolean;

}
