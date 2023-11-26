import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).send()
  }

  const [, token] = authToken.split(' ')
  try {
    const { sub } = verify(token, process.env.TOKEN_SECRET_KEY) as IPayload
    req.userId = sub
  } catch (error) {
    return res.status(401).send()
  }
  next()
}
