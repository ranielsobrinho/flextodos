import { getRepository } from "typeorm";
import { User } from "../../domain/entity/User";
import * as bcrypt from "bcrypt";

interface userRequest {
  username: string;
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async handle({
    username,
    name,
    email,
    password,
  }: userRequest): Promise<User | Error> {
    const repo = getRepository(User);
    if (await repo.findOne({ username })) {
      return new Error("This user already exists.");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = repo.create({
      username,
      name,
      email,
      password: hashPassword,
    });
    await repo.save(user);

    return user;
  }
}

export default new CreateUserService();
