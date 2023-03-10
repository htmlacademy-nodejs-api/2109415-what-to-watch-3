import { IsArray, IsDateString, IsEnum, IsHexColor, IsInt, IsMongoId, IsOptional, IsString, IsUrl, Max, MaxLength, Min, MinLength } from 'class-validator';
import { GenreType } from '../../../types/genre-type.enum.js';
import { FilmDescription, FilmDirector, FilmTitle, ReleasedYear, RunTime } from '../../../const.js';

export default class UpdateMovieCardDto {

  @MinLength(FilmTitle.Min, {message: `Minimum title length must be ${FilmTitle.Min}`})
  @MaxLength(FilmTitle.Max, {message: `Maximum title length must be ${FilmTitle.Max}`})
  public title?: string;

  @MinLength(FilmDescription.Min, {message: `Minimum description length must be ${FilmDescription.Min}`})
  @MaxLength(FilmDescription.Max, {message: `Maximum description length must be ${FilmDescription.Max}`})
  public description?: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate?: Date;

  @IsEnum(GenreType, {message: 'Genre have to be from: Comedy, Crime, Documentary, Drama, Horror, Family, Romance, Scifi, Thriller'})
  public genre?: string;

  @IsInt({message: 'Year must be an integer'})
  @Min(ReleasedYear.Min, {message: `Minimum year is ${ReleasedYear.Min}`})
  @Max(ReleasedYear.Max, {message: `Maximum year is ${ReleasedYear.Max}`})
  public released?: number;

  @MaxLength(256, {message: 'Too short for field «image»'})
  public previewVideoLink?: string;

  @IsUrl({}, {message: 'Not URL link'})
  public videoLink?: string;

  @IsArray({message: 'Field categories must be an array'})
  public staring?: string;

  @MinLength(FilmDirector.Min, {message: `Minimum title length must be ${FilmDirector.Min}`})
  @MaxLength(FilmDirector.Max, {message: `Maximum title length must be ${FilmDirector.Max}`})
  public director?: string;

  @IsInt({message: 'Runtime must be an integer'})
  @Min(RunTime.Min, {message: `Minimum runtime is ${RunTime.Min} `})
  @Max(RunTime.Max, {message: `Maximum runtime is ${RunTime.Max}`})
  public runTime?: string;

  @IsOptional()
  @IsString({message: 'image is required'})
  @MaxLength(256, {message: 'Too short for field «image»'})
  public posterImage?: string;

  @IsOptional()
  @IsString({message: 'image is required'})
  @MaxLength(256, {message: 'Too short for field «image»'})
  public backgroundImage?: string;

  @IsHexColor({message: 'Not Hex color'})
  public backgroundColor?: string;

  @IsMongoId({message: 'userId field must be valid an id'})
  public userId?: string;
}
