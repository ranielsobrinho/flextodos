import { Request, Response } from "express";
import { ValidationError } from "yup";
import CreateUserService from "../../services/UserService/CreateUserService";
import { IResponse, ResponseStatus } from "../../utils/service";

class CreateUser {
  async execute(
    req: Request,
    res: Response<IResponse>
  ): Promise<Response<IResponse>> {
    try {
      const { username, name, email, password } = req.body;
      const created = await CreateUserService.handle({
        username,
        name,
        email,
        password,
      });

      if (created instanceof Error) {
        return res.status(400).json({
          status: ResponseStatus.BAD_REQUEST,
          message: created.message,
        });
      }
      return res.json({
        status: ResponseStatus.OK,
        data: created,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({
          status: ResponseStatus.BAD_REQUEST,
          errors: error.errors,
        });
      }
      return res.status(500).json({
        status: ResponseStatus.INTERNAL_SERVER_ERROR,
        message: "An internal server error happened.",
      });
    }
  }
}

export default new CreateUser();
