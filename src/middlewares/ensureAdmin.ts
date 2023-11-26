import { Request, Response, NextFunction } from 'express'
import { UsersServices } from '../services/users.service'

const usersServices = new UsersServices()

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { isAdmin } = await usersServices.getById(req.userId)

  if (isAdmin) {
    return next()
  }

  return res.status(400).json({
    error: 'Unauthorized'
  })
}
