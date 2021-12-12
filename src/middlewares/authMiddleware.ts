
import { Request, NextFunction, Response } from 'express'
import * as jwt from 'jwt-simple'

class AuthMiddleware {
  async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.headers.authorization.split(' ')[1]!
      const decodedToken = jwt.decode(token, '165432879r')
      if (decodedToken) {
        return next()
      }
      return res
        .status(400)
        .json({ message: 'You are not authorized for this path' })
    } catch (err) {
      return res.status(400).json(err)
    }
  }
}

export default new AuthMiddleware()