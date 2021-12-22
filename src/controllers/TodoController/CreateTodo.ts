import { Request, Response } from "express";
import { ValidationError } from "yup";
import CreateTodoService from "../../services/TodosService/CreateTodoService";
import { IResponse, ResponseStatus } from "../../utils/service";

class CreateTodo {
  async execute(
    req: Request,
    res: Response<IResponse>
  ): Promise<Response<IResponse>> {
    try {
      const { content, userId } = req.body;
      const todo = await CreateTodoService.handle({ content, userId });
      if (todo instanceof Error) {
        return res.status(400).json({
          status: ResponseStatus.BAD_REQUEST,
          message: todo.message,
        });
      }
      return res.json({
        status: ResponseStatus.OK,
        data: todo,
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

export default new CreateTodo();
