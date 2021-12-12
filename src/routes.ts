import { Router } from "express"
import TodoController from "./controllers/TodoController"
import UserController from "./controllers/UserController"

const routes = Router()

routes.get('/users', UserController.getUsers)
routes.get('/users/:id', UserController.getOneUser)
routes.post('/users', UserController.createUser)
routes.put('/users/:id', UserController.updateUser)
routes.delete('/users/:id', UserController.deleteUser)

routes.get('/todos', TodoController.getTodo)
routes.get('/todos/:id', TodoController.getOneTodo)
routes.post('/todos', TodoController.createTodo)
routes.put('/todos/:id', TodoController.updateTodo)
routes.delete('/todos/:id', TodoController.deleteTodo)

export default routes