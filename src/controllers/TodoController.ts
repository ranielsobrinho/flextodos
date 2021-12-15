import { Request, Response } from 'express'
import { IResponse, ResponseStatus } from '../utils/service'
import TodosService from '../services/TodosService'
import { ValidationError } from 'yup'

class TodoController{
  async getTodo(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
    try{
      const todos = await TodosService.getAll()

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
      const todo = await TodosService.getOne(id)

      if(todo instanceof Error){
        return res.status(400).json({
          status: ResponseStatus.BAD_REQUEST,
          message: todo.message
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
      const {content, userId} = req.body
      const createdTodo = await TodosService.create(content, userId)

      return res.json({
        status: ResponseStatus.OK,
        data: createdTodo
      })
    }catch (error){
      if(error instanceof ValidationError){
        return res.status(400).json({
          status: ResponseStatus.BAD_REQUEST,
          errors: error.errors
        })
      }
      return res.status(500).json({
        status: ResponseStatus.INTERNAL_SERVER_ERROR,
        message: 'An internal error has happened.'
      })
    }
  }

  async updateTodo(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
    try{
      const { id } = req.params
      const { content } = req.body
      const updatedTodo = await TodosService.update(id, content)

      if(updatedTodo instanceof Error){
        return res.status(400).json({
          status: ResponseStatus.NOT_FOUND,
          message: updatedTodo.message
        })
      }

      return res.json({
        status: ResponseStatus.OK,
        data: updatedTodo
      })
    }catch(error){
      if(error instanceof ValidationError){
        return res.status(400).json({
          status: ResponseStatus.BAD_REQUEST,
          errors: error.errors
        })
      }
      return res.status(500).json({
        status: ResponseStatus.INTERNAL_SERVER_ERROR,
        message: 'An internal error has happened.'
      })
    }
  }

  async deleteTodo(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
    try{
      const { id } = req.params
      const todo = await TodosService.delete(id)

      if(todo instanceof Error){
        return res.status(404).json({
          status: ResponseStatus.NOT_FOUND,
          message: todo.message
        })
      }

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

export default new TodoController()