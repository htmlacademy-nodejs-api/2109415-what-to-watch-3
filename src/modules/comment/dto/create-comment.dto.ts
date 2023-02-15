import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { CommentRating, CommentText } from '../../../const.js';

export default class CreateCommentDto {
  @IsString({message: 'text is required'})
  @Length(CommentText.Min, CommentText.Max, {message: `Min length is ${CommentText.Min}, max is ${CommentText.Max}`})
  public text!: string;

  @IsInt({message: 'Interger is required'})
  @Min(CommentRating.Min, {message: `Not less than ${CommentRating.Min}`})
  @Max(CommentRating.Max, {message: `Not more than ${CommentRating.Max}`})
  public rating!: number;

  @IsMongoId({message: 'movieCardId field must be a valid id'})
  public movieCardId!: string;

  public userId!: string;
}

