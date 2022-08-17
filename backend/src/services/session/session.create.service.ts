import { UserRepository } from '../../database/postgres/repositories/user.repository';
import Hash from '../_libs/Hash';
import AppError from '../../errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<boolean> {
    const userExists = await UserRepository.findOne({
      where: {
        email,
      },
      select: ['id', 'email', 'password'],
    });

    if (!userExists) {
      throw new AppError('Not able to login with given credentials');
    }

    const validPassword = await Hash.compareHash(password, userExists.password);

    return validPassword;
  }
}

export default new CreateSessionService();
