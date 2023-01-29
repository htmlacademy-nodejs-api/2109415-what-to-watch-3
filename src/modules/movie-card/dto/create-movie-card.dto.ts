
export default class CreateMovieCardDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public genres!: string[];
  public released!: string;
  public previewVideoLink!: string;
  public videoLink!: string;
  public staring!: string;
  public director!: string;
  public runTime!: string;
  public posterImage!: string;
  public backgroundImage!: string;
  public backgroundColor!: string;

  public userId!: string;
}
