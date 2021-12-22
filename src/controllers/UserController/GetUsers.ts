import { Request, Response } from "express";
import getAllService from "../../services/UserService/GetAllService";
import { IResponse, ResponseStatus } from "../../utils/service";

class GetUsers {
  async execute(
    req: Request,
    res: Response<IResponse>
  ): Promise<Response<IResponse>> {
    try {
      const users = await getAllService.handle();

      return res.json({
        status: ResponseStatus.OK,
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        status: ResponseStatus.INTERNAL_SERVER_ERROR,
        message: "An internal server error happened.",
      });
    }
  }
}

export default new GetUsers();
