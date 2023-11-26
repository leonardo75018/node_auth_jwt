import { prisma } from '../model/prisma'
import { CreateUserDTO, UserLoginDTO } from '../controllers/dto/index'
import { hash, compare } from 'bcrypt'
import { sign, decode } from 'jsonwebtoken'

export class UsersServices {
  async create(createUserDTO: CreateUserDTO) {
    const userExist = await prisma.user.findUnique({
      where: {
        email: createUserDTO.email
      }
    })

    if (userExist) {
      throw new Error('user already exist')
    }

    createUserDTO.password = await hash(createUserDTO.password, 8)

    const user = prisma.user.create({ data: createUserDTO })
    return user
  }

  async getAll() {
    const users = await prisma.user.findMany()
    return users
  }

  async getById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId)
      }
    })
    return user
  }

  async login(userLoginDTO: UserLoginDTO) {
    const user = await prisma.user.findUnique({
      where: {
        email: userLoginDTO.email
      }
    })

    const comparePassWrd = await compare(userLoginDTO.password, user.password)
    if (!comparePassWrd) {
      throw new Error('Email,Password incorrect')
    }

    const token = sign({ userId: user.id }, process.env.TOKEN_SECRET_KEY, {
      subject: String(user.id),
      expiresIn: '1d'
    })

    user.password = undefined
    return { user, token }
  }
}
