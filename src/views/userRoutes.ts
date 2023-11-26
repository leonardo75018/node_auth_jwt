import { Router } from 'express'

export const userRoutes = Router()
import { UsersController } from '../controllers/users.controller'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const usersController = new UsersController()

userRoutes.post('/', usersController.createUser)
userRoutes.post('/login', usersController.login)
userRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  usersController.getAllUsers
)
