import { Router } from "express";
import AuthController from "./controllers/AuthController";
import {
  GetUsers,
  GetOneUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
} from "./controllers/UserController/";

import {
  GetAll,
  GetOne,
  CreateTodo,
  UpdateTodo,
  DeleteTodo,
} from "./controllers/TodoController/";
import {
  todoSchema,
  userSchema,
  authSchema,
  updateUserSchema,
} from "./utils/validations";

import { authMiddleware, validate } from "./middlewares";

const routes = Router();

routes.get("/users", GetUsers.execute);
routes.get("/users/:id", GetOneUser.execute);
routes.post("/users", validate(userSchema), CreateUser.execute);
routes.put(
  "/users/:id",
  authMiddleware.auth,
  validate(updateUserSchema),
  UpdateUser.execute
);
routes.delete("/users/:id", authMiddleware.auth, DeleteUser.execute);

routes.get("/todos", authMiddleware.auth, GetAll.execute);
routes.get("/todos/:id", GetOne.execute);
routes.post(
  "/todos",
  authMiddleware.auth,
  validate(todoSchema),
  CreateTodo.execute
);
routes.put("/todos/:id", authMiddleware.auth, UpdateTodo.execute);
routes.delete("/todos/:id", authMiddleware.auth, DeleteTodo.execute);

routes.post("/auth", validate(authSchema), AuthController.authenticate);

export default routes;
