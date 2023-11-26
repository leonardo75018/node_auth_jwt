import { Router } from 'express'
import { userRoutes } from './userRoutes'

export const router = Router()

router.use('/users', userRoutes)
