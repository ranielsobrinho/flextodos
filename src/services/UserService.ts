import { getRepository } from 'typeorm'
import { User } from '../domain/entity/User'
import * as bcrypt from 'bcrypt'

interface UserRequest{
  username: string,
  name: string,
  email:string,
  password: string
}
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

  async create({username, name, email, password}: UserRequest): Promise<User | Error>{
    const repo = getRepository(User)
    if(await repo.findOne({username})){
      return new Error('This user already exists.')
    }
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)
    const user = repo.create({
      username,
      name,
      email,
      password: hashPassword
    })
    await repo.save(user)

    return user
  }
}

export default new UserService()