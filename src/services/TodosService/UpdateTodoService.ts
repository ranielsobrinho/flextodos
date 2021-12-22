import { getRepository } from "typeorm";
import { Todo } from "../../domain/entity/Todo";

interface todoRequest {
  content: string;
  id: string;
}

class UpdateTodoService {
  async handle({ content, id }: todoRequest) {
    const repo = getRepository(Todo);
    if (!(await repo.findOne(id))) {
      return new Error("Cannot be updated. This todo does not exists.");
    }
    const updated = await repo.update(id, { content });
    return updated;
  }
}

export default new UpdateTodoService();
