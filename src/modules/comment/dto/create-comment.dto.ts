import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';

export default class CreateCommentDto {
  @IsString({message: 'text is required'})
  @Length(5, 1024, {message: 'Min length is 5, max is 1024'})
  public text!: string;

  @IsInt({message: 'Interger is required'})
  @Min(0, {message: 'From 0 to 10'})
  @Max(10, {message: 'From 0 to 10'})
  public rating!: number;

  @IsMongoId({message: 'offerId field must be a valid id'})
  public movieCardId!: string;

  public userId!: string;
}

