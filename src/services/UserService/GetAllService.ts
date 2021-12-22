import { getRepository } from "typeorm";
import { User } from "../../domain/entity/User";

class getAllService {
  async handle() {
    const repo = getRepository(User);
    const users = await repo.find();

    return users;
  }
}

export default new getAllService();
