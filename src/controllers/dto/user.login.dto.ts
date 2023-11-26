import { IsNotEmpty, IsEmail } from 'class-validator'

export class UserLoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}
