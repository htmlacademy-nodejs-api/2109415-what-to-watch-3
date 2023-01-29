import {Expose} from 'class-transformer';

export default class UserResponse {
   @Expose()
  public email!: string ;

   @Expose()
   public avatarPath!: string;

   @Expose()
   public name!: string;

}
