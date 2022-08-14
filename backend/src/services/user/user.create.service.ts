import { UserRepository } from '../../database/postgres/repositories/user.repository';
import Hash from '../_libs/Hash';
import AppError from '../../errors/AppError';
import { isValidEmail } from '../../helpers';

interface IRequest {
  login: string;
  email: string;
  password: string;
}

interface IResponse {
  login: string;
  email: string;
}

class CreateUserService {
  public async execute({
    login,
    password,
    email,
  }: IRequest): Promise<IResponse> {
    const userExists = await UserRepository.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new AppError('Email address is already taken by someone else');
    }

    const validEmail = isValidEmail(email);

    if (!validEmail) {
      throw new AppError('Email address is not valid');
    }

    const hashedPassword = await Hash.generateHash(password);

    const user = await UserRepository.save({
      login,
      email,
      password: hashedPassword,
    });

    return {
      email: user.email,
      login: user.login,
    };
  }
}

export default new CreateUserService();