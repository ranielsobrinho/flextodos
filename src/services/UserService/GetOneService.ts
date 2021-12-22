import { getRepository } from "typeorm";
import { User } from "../../domain/entity/User";

class GetOneService {
  async handle(id: string) {
    const repo = getRepository(User);
    const user = await repo.findOne(id, {
      relations: ["todos"],
    });
    if (!user) {
      return new Error("User does not exists.");
    }
    return user;
  }
}

export default new GetOneService();
