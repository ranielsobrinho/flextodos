import { getRepository } from "typeorm";
import { Todo } from "../../domain/entity/Todo";

class GetTodosService {
  async handle() {
    const repo = getRepository(Todo);
    const todos = await repo.find();

    return todos;
  }
}

export default new GetTodosService();
