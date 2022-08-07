import { Request, Response } from "express";
import userCreateService from "../../services/user/user.create.service";
import userListService from "../../services/user/user.list.service";

export class UserController {

  public async list(request: Request, response: Response): Promise<Response> {
    const users = await userListService.listAll();
    return response.status(200).json(users);
  }

  public async save(request: Request, response: Response): Promise<Response> {
    const { login, email, password } = request.body;

    const payload = {
      login, email, password
    }

    const user = await userCreateService.execute(payload);

    return response.status(201).json(user);
  }
}