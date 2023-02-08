import { Contains, IsArray, IsDateString, IsEnum, IsHexColor, IsInt, IsUrl, Max, MaxLength, Min, MinLength } from 'class-validator';
import { GenreType } from '../../../types/genre-type.enum.js';

export default class CreateMovieCardDto {

  @MinLength(2, {message: 'Minimum title length must be 2'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsDateString({}, {message: 'PostDate must be valid ISO date'})
  public postDate!: Date;

  @IsEnum(GenreType, {message: 'Genre have to be from: Comedy, Crime, Documentary, Drama, Horror, Family, Romance, Scifi, Thriller'})
  public genre!: string;

  @IsInt({message: 'Year must be an integer'})
  @Min(1850, {message: 'Minimum year is 1850'})
  @Max(2050, {message: 'Maximum year is 2050'})
  public released!: number;

  @MaxLength(256, {message: 'Too short for field «image»'})
  public previewVideoLink!: string;

  @IsUrl({}, {message: 'Not URL link'})
  public videoLink!: string;

  @IsArray({message: 'Field categories must be an array'})
  public staring!: [string];

  @MinLength(2, {message: 'Minimum title length must be 2'})
  @MaxLength(50, {message: 'Maximum title length must be 50'})
  public director!: string;

  @IsInt({message: 'Runtime must be an integer'})
  @Min(10, {message: 'Minimum runtime is 10'})
  @Max(2050, {message: 'Maximum runtime is 2050'})
  public runTime!: string;

  @Contains('.jpg', {message: 'Must be *.jpg file'})
  public posterImage!: string;

  @Contains('.jpg', {message: 'Must be *.jpg file'})
  public backgroundImage!: string;

  @IsHexColor({message: 'Must be Hex color'})
  public backgroundColor!: string;

  public userId!: string;
}
