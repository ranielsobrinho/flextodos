import { getRepository } from "typeorm";
import { Todo } from "../../domain/entity/Todo";

class DeleteTodoService {
  async handle(id: string) {
    const repo = getRepository(Todo);
    if (!(await repo.findOne(id))) {
      return new Error("Cannot be deleted. This todo does not exists.");
    }
    await repo.delete(id);
  }
}

export default new DeleteTodoService();
