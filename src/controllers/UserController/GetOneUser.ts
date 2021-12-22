import { Request, Response } from "express";
import { IResponse, ResponseStatus } from "../../utils/service";
import GetOneService from "../../services/UserService/GetOneService";

class GetOneUser {
  async execute(
    req: Request,
    res: Response<IResponse>
  ): Promise<Response<IResponse>> {
    try {
      const { id } = req.params;
      const user = await GetOneService.handle(id);
      if (user instanceof Error) {
        return res.status(400).json({
          status: ResponseStatus.BAD_REQUEST,
          message: user.message,
        });
      }

      return res.json({
        status: ResponseStatus.OK,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: ResponseStatus.INTERNAL_SERVER_ERROR,
        message: "An internal server error happened.",
      });
    }
  }
}

export default new GetOneUser();
