import { getRepository } from 'typeorm'
import { User } from '../domain/entity/User'

class UserService {
  async getAll(){
    const repo = getRepository(User)
    const users = await repo.find()

    return users
  }

  async getOne(id: string){
    const repo = getRepository(User)
    const user = await repo.findOne(id,{
      relations: ['todos']
    })

    if(!user){
      return new Error('User does not exists.')
    }

    return user
  }
}

export default new UserService()