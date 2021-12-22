import { getRepository } from "typeorm";
import { User } from "../../domain/entity/User";

class DeleteUserService {
  async handle(id: string) {
    const repo = getRepository(User);
    if (!(await repo.findOne(id))) {
      return new Error("User does not exists.");
    }

    await repo.delete(id);
  }
}

export default new DeleteUserService();
