import { Staring } from '../../../types/staring.type';

export default class UpdateMovieCardDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public genre?: string;
  public released?: string;
  public rating?: string;
  public previewVideoLink?: string;
  public videoLink?: string;
  public staring?: Staring[];
  public director?: string;
  public runTime?: string;
  public posterImage?: string;
  public backgroundImage?: string;
}
