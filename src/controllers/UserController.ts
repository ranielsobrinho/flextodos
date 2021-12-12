import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { User } from "../domain/entity/User"
import { ResponseStatus, IResponse } from "../utils/service"
import * as bcrypt from 'bcrypt'

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

    async getOneUser(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try{
            const { id } = req.params
            const userRepository = getRepository(User)
            const user = await userRepository.find({where: {id}})

            if(user.length === 0){
                return res.status(404).json({
                    status: ResponseStatus.NOT_FOUND,
                    message: 'Seems like there is no user with this id.'
                })
            }

            return res.json({
                status: ResponseStatus.OK,
                data: user
            })
        }catch(error){
            return res.status(500).json({
                status: ResponseStatus.INTERNAL_SERVER_ERROR,
                message: 'An internal error has happened.'
            })
        }
    }

    async createUser(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try{
            const { username, name, email } = req.body
            const userRepository = getRepository(User)

            const salt = bcrypt.genSaltSync(10)
            const password = bcrypt.hashSync(req.body.password, salt)

            const created = await userRepository.save({username, password, name, email})
            return res.json({
                status: ResponseStatus.OK,
                data: created
            })
        }catch(error){
            return res.status(500).json({
                status: ResponseStatus.INTERNAL_SERVER_ERROR,
                errors: error
            })
        }
    }

    async updateUser(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try{
            const { id } = req.params
            const userRepository = getRepository(User)
            const updated = await userRepository.update(id, req.body)

            return res.json({
                status: ResponseStatus.OK,
                data: updated
            })
        }catch(error){
            return res.status(500).json({
                status: ResponseStatus.INTERNAL_SERVER_ERROR,
                message: 'An internal server error has happened.'
            })
        }
    }

    async deleteUser(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try{
            const { id } = req.params
            const userRepository = getRepository(User)
            const deleteUser = await userRepository.delete(id)
            
            return res.json({
                status: ResponseStatus.OK,
                message: 'User deleted successfully.'
            })
        }catch(error){
            return res.status(500).json({
                status: ResponseStatus.INTERNAL_SERVER_ERROR,
                message: 'An internal server error has happened.'
            })
        }
    }
}

export default new UserController()