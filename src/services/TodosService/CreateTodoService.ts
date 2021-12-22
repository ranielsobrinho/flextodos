import { getRepository } from "typeorm";
import { Todo } from "../../domain/entity/Todo";
import { User } from "../../domain/entity/User";

interface todoRequest {
  content: string;
  userId: User;
}

class CreateTodoService {
  async handle({ content, userId }: todoRequest): Promise<Todo | Error> {
    const repo = getRepository(Todo);
    const userRepo = getRepository(User);
    if (!(await userRepo.findOne(userId))) {
      return new Error("Invalid requisition. This user does not exists.");
    }
    const todo = repo.create({
      content,
      userId,
    });
    await repo.save(todo);
    return todo;
  }
}

export default new CreateTodoService();
