import { Router } from "express"
import { TodoController, UserController, AuthController } from "./controllers/"
import { authMiddleware, validate } from "./middlewares"
import { todoSchema, userSchema, authSchema } from "./utils/validations"

const routes = Router()

routes.get('/users', UserController.getUsers)
routes.get('/users/:id', UserController.getOneUser)
routes.post('/users', validate(userSchema),UserController.createUser)
routes.put('/users/:id', authMiddleware.auth, validate(userSchema), UserController.updateUser)
routes.delete('/users/:id', authMiddleware.auth, UserController.deleteUser)

routes.get('/todos', authMiddleware.auth , TodoController.getTodo)
routes.get('/todos/:id', authMiddleware.auth, TodoController.getOneTodo)
routes.post('/todos', authMiddleware.auth, validate(todoSchema), TodoController.createTodo)
routes.put('/todos/:id', authMiddleware.auth, validate(todoSchema), TodoController.updateTodo)
routes.delete('/todos/:id', authMiddleware.auth, TodoController.deleteTodo)

routes.post('/auth', validate(authSchema), AuthController.authenticate)

export default routes