import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { User } from "../domain/entity/User"
import { ResponseStatus, IResponse } from "../utils/service"

class UserController {
    async getUsers(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try{
            const userRepository = getRepository(User)
            const allUsers = await userRepository.find()

            return res.json({
                status: ResponseStatus.OK,
                data: allUsers
            })
        } catch(error) {
            return res.status(500).json({
                status: ResponseStatus.INTERNAL_SERVER_ERROR,
                message: 'An internal server error has happened.'
            })
        }
    }
}

export default new UserController()