import { Request, Response } from "express";
import DeleteTodoService from "../../services/TodosService/DeleteTodoService";
import { IResponse, ResponseStatus } from "../../utils/service";

class DeleteTodo {
  async execute(
    req: Request,
    res: Response<IResponse>
  ): Promise<Response<IResponse>> {
    try {
      const { id } = req.params;
      const deleted = await DeleteTodoService.handle(id);

      if (deleted instanceof Error) {
        return res.status(400).json({
          status: ResponseStatus.BAD_REQUEST,
          message: deleted.message,
        });
      }

      return res.json({
        status: ResponseStatus.OK,
        message: "Deleted successfuly.",
      });
    } catch (error) {
      return res.status(500).json({
        status: ResponseStatus.INTERNAL_SERVER_ERROR,
        message: "An internal server error happened.",
      });
    }
  }
}

export default new DeleteTodo();
