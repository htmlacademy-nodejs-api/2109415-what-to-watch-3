import { IsEmail, IsString, Length} from 'class-validator';
import { UserName, UserPassword } from '../../../const.js';

export default class CreateUserDto {

  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string ;

  @IsString({message: 'name is required'})
  @Length(UserName.Min, UserName.Max, {message: `Min length is ${UserName.Min}, max is ${UserName.Max}`})
  public name!: string;

  @IsString({message: 'password is required'})
  @Length(UserPassword.Min, UserPassword.Max, {message: `Min length for password is ${UserPassword.Min}, max is ${UserPassword.Max}`})
  public password!: string;
}
