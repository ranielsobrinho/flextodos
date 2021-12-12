import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { IResponse, ResponseStatus } from '../utils/service'
import { Todo } from '../domain/entity/Todo'

class TodoController{
  async getTodo(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
    try{
      const todoRepository = getRepository(Todo)
      const todos = await todoRepository.find()

      return res.json({
        status: ResponseStatus.OK,
        data: todos,
      })
    }catch(error){
      return res.status(500).json({
        status: ResponseStatus.INTERNAL_SERVER_ERROR,
        message: 'An internal error has happened.'
      })
    }
  }

  async getOneTodo(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
    try{
      const { id } = req.params
      const todoRepository = getRepository(Todo)
      const todo = await todoRepository.findOne(id)

      if(!todo){
        return res.status(404).json({
          status: ResponseStatus.NOT_FOUND,
          message: 'No todo with this id.'
        })
      }

      return res.json({
        status: ResponseStatus.OK,
        data: todo,
      })
    }catch(error){
      return res.status(500).json({
        status: ResponseStatus.INTERNAL_SERVER_ERROR,
        message: 'An internal error has happened.'
      })
    }
  }

  async createTodo(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
    try{
      const todoRepository = getRepository(Todo)
      const createdTodo = await todoRepository.save(req.body)

      return res.json({
        status: ResponseStatus.OK,
        data: createdTodo
      })
    }catch (error){
      return res.status(500).json({
        status: ResponseStatus.INTERNAL_SERVER_ERROR,
        message: 'An internal error has happened.'
      })
    }
  }

  async updateTodo(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
    try{
      const { id } = req.params
      const todoRepository = getRepository(Todo)

      const todo = await todoRepository.findOne(id)

      if(!todo){
        return res.status(404).json({
          status: ResponseStatus.NOT_FOUND,
          message: 'No todo with this id.'
        })
      }

      const updatedTodo = await todoRepository.update(id, req.body)

      return res.json({
        status: ResponseStatus.OK,
        data: updatedTodo
      })
    }catch(error){
      return res.status(500).json({
        status: ResponseStatus.INTERNAL_SERVER_ERROR,
        message: 'An internal error has happened.'
      })
    }
  }

  async deleteTodo(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
    try{
      const { id } = req.params
      const todoRepository = getRepository(Todo)

      const todo = await todoRepository.findOne(id)
      if(!todo){
        return res.status(404).json({
          status: ResponseStatus.NOT_FOUND,
          message: 'No todo with this id.'
        })
      }

      const deleted = await todoRepository.delete(id)

      return res.json({
        status: ResponseStatus.OK,
        message: 'Deleted successfully'
      })
    }catch(error) {
      return res.status(500).json({
        status: ResponseStatus.INTERNAL_SERVER_ERROR,
        message: 'An internal error has happened.'
      })
    }
  }
}