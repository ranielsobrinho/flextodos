import { getRepository } from "typeorm";
import { User } from "../../domain/entity/User";

interface UserRequest {
  id: string;
  name: string;
  username: string;
  email: string;
}

class UpdatedUserService {
  async handle({ id, name, username, email }: UserRequest) {
    const repo = getRepository(User);
    if (!(await repo.findOne(id))) {
      return new Error("User does not exists.");
    }

    const updateUser = repo.update(id, {
      name,
      username,
      email,
    });

    return updateUser;
  }
}

export default new UpdatedUserService();
