import { Request, Response } from "express";
import { IResponse, ResponseStatus } from "../../utils/service";
import GetTodosService from "../../services/TodosService/GetTodosService";

class GetAll {
  async execute(
    req: Request,
    res: Response<IResponse>
  ): Promise<Response<IResponse>> {
    try {
      const todos = await GetTodosService.handle();
      return res.json({
        status: ResponseStatus.OK,
        data: todos,
      });
    } catch (error) {
      return res.status(500).json({
        status: ResponseStatus.INTERNAL_SERVER_ERROR,
        message: "An internal server error happened.",
      });
    }
  }
}

export default new GetAll();
