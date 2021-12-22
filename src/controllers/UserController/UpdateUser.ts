import { Request, Response } from "express";
import { ValidationError } from "yup";
import UpdateUserService from "../../services/UserService/UpdateUserService";
import { IResponse, ResponseStatus } from "../../utils/service";

class UpdateUser {
  async execute(
    req: Request,
    res: Response<IResponse>
  ): Promise<Response<IResponse>> {
    try {
      const { id } = req.params;
      const { name, username, email } = req.body;
      const updated = await UpdateUserService.handle({
        id,
        name,
        username,
        email,
      });
      if (updated instanceof Error) {
        return res.status(400).json({
          status: ResponseStatus.BAD_REQUEST,
          message: updated.message,
        });
      }

      return res.json({
        status: ResponseStatus.OK,
        data: updated,
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

export default new UpdateUser();
