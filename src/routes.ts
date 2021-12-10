import { Router } from "express"
import UserController from "./controllers/UserController"

const routes = Router()

routes.get('/users', UserController.getUsers)
routes.get('/users/:id', UserController.getOneUser)
routes.post('/users', UserController.createUser)
routes.put('/users/:id', UserController.updateUser)


export default routes