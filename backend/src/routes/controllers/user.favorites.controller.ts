import { Request, Response } from "express";
import userFavoriteCreateService from "../../services/userFavorites/user.favorites.create.service";
import userFavoriteListService from "../../services/userFavorites/user.favorites.list.service";

export class UserFavoritesController {

  public async list(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const users = await userFavoriteListService.listByUserId(userId);
    return response.status(200).json(users);
  }

  public async save(request: Request, response: Response): Promise<Response> {
    const { userId, matricula } = request.body;

    const payload = {
      userId, matricula
    }

    const userFavorite = await userFavoriteCreateService.execute(payload);

    return response.status(201).json(userFavorite);
  }
}