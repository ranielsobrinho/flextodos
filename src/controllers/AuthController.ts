import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { User } from "../domain/entity/User"
import * as bcrypt from 'bcrypt'
import * as jwt from 'jwt-simple'

class AuthController{
  async authenticate(req: Request, res: Response){
    const repository = getRepository(User)
    const { username, password } = req.body

    const user = await repository.findOne({where: {username}})
      .then(user => {
        if(!user){
          return res.status(404).json({
            message: 'No user have this username.'
          })
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if(err){
            return res.status(400).json({
              message: 'Authentication has fail.'
            })
          }
          if(!result){
            return res.status(404).json({
              message: 'Invalid password'
            })
          }
          const payload = {id: user.id}

          return res.json({
            token: jwt.encode(payload, '165432879r'),
            userId: user.id
          })
        })
      }).catch((err) => res.status(500).json(err))
  }
}

export default new AuthController()