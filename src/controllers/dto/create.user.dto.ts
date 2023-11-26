import { IsNotEmpty, IsEmail } from 'class-validator'

export class CreateUserDTO {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  isAdmin: boolean

  @IsNotEmpty()
  password: string
}
