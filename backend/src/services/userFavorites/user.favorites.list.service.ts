import { UserFavorites } from '../../database/postgres/entities/user.favorites.entity'; 
import { UserFavoritesRepository } from '../../database/postgres/repositories/user.favorites.repository'; 

class ListUserFavoritesService {
  constructor() {}

  public async listByUserId(userId: string): Promise<UserFavorites[]> {
    const usersFavorites = await UserFavoritesRepository.find({
      where: {
        userId
      }
    });
    return usersFavorites;
  }
}

export default new ListUserFavoritesService();