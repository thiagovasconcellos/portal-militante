import { UserRepository } from '../../database/postgres/repositories/user.repository';
import { UserFavoritesRepository } from '../../database/postgres/repositories/user.favorites.repository'; 
import AppError from '../../errors/AppError';

interface IRequest {
  userId: string;
  matricula: string;
}

class CreateUserFavoritesService {
  constructor() {}

  public async execute({userId, matricula}: IRequest): Promise<boolean> {
    const userExists = await UserRepository.findOne({
      where: {
        id: userId
      }
    });

    if (!userExists) {
      throw new AppError('Invalid user id');
    }

    const recordExists = await UserFavoritesRepository.findOne({
      where: {
        userId,
        matricula
      }
    });

    if (recordExists) {
      throw new AppError('Already created entry for this user and this deputy');
    }

    const userFavorite = await UserFavoritesRepository.save({
      userId,
      matricula
    });

    if (userFavorite) {
      return true;
    }
    return false;
  }
}

export default new CreateUserFavoritesService();