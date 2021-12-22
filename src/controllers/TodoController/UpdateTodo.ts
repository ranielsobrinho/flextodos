import { Request, Response } from "express";
import { ValidationError } from "yup";
import UpdateTodoService from "../../services/TodosService/UpdateTodoService";
import { IResponse, ResponseStatus } from "../../utils/service";

class UpdateTodo {
  async execute(
    req: Request,
    res: Response<IResponse>
  ): Promise<Response<IResponse>> {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const updated = await UpdateTodoService.handle({ id, content });

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

export default new UpdateTodo();
