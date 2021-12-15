import { getRepository } from "typeorm";
import { Todo } from "../domain/entity/Todo";
import { User } from "../domain/entity/User";


class TodosServices {
  async getAll(){
    const repo = getRepository(Todo)

    const todos = await repo.find()

    return todos
  }

  async getOne(id: string){
    const repo = getRepository(Todo)
    const todo = await repo.findOne(id,{
      relations: ['userId']
    })
    if(!todo){
      return new Error("This todo does not exists.")
    }
    return todo
  }

  async create(content: string, userId: User): Promise<Todo | Error>{
    const repo = getRepository(Todo)
    const userRepo = getRepository(User)

    if(! await userRepo.findOne(userId)){
      return new Error("This user does not exists.")
    }

    const todo = repo.create({
      content,
      userId
    })

    await repo.save(todo)
    return todo
  }

  async update(id: string, content: string){
    const repo = getRepository(Todo)
    const userRepo = getRepository(User)

    if(! await userRepo.findOne(id)){
      return new Error("This user does not exists.")
    }

    const updatedTodo = await repo.update(id, {content})

    return updatedTodo
  }

  async delete(id: string){
    const repo = getRepository(Todo)
    if(! await repo.findOne(id)){
      return new Error("This todo does not exists.")
    }

    await repo.delete(id)
  }
}

export default new TodosServices()