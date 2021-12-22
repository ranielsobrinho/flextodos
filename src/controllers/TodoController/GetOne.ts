import { Request, Response } from "express";
import { IResponse, ResponseStatus } from "../../utils/service";
import GetOneTodoService from "../../services/TodosService/GetOneTodoService";

class GetOne {
  async execute(
    req: Request,
    res: Response<IResponse>
  ): Promise<Response<IResponse>> {
    try {
      const { id } = req.params;
      const todo = await GetOneTodoService.handle(id);
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
      return res.status(500).json({
        status: ResponseStatus.INTERNAL_SERVER_ERROR,
        message: "An internal server error happened.",
      });
    }
  }
}

export default new GetOne();
