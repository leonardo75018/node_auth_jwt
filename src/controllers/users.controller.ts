import { UsersServices } from '../services/users.service'
import { CreateUserDTO, UserLoginDTO } from './dto'
import { Request, Response } from 'express'

export class UsersController {
  async createUser(req: Request, res: Response) {
    const createUserDTO: CreateUserDTO = req.body
    const usersServices = new UsersServices()

    const user = await usersServices.create(createUserDTO)
    res.status(201).send(user)
  }

  async getAllUsers(req: Request, res: Response) {
    const usersServices = new UsersServices()
    const users = await usersServices.getAll()
    res.status(200).send(users)
  }

  async login(req: Request, res: Response) {
    const usersServices = new UsersServices()
    const createUserRequest: UserLoginDTO = req.body

    const token = await usersServices.login(createUserRequest)
    return res.status(200).send(token)
  }
}
