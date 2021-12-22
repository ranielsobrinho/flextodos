import { getRepository } from "typeorm";
import { Todo } from "../../domain/entity/Todo";

class GetOneTodoService {
  async handle(id: string): Promise<Todo | Error> {
    const repo = getRepository(Todo);
    const todo = await repo.findOne(id, {
      relations: ["userId"],
    });
    if (!todo) {
      return new Error("Todo does not exists.");
    }
    return todo;
  }
}

export default new GetOneTodoService();
