import { User } from '../../database/postgres/entities/user.entity';
import { UserRepository } from '../../database/postgres/repositories/user.repository';

class ListUserService {
  constructor() {}

  public async listAll(): Promise<User[]> {
    const users = await UserRepository.find();
    return users;
  }
}

export default new ListUserService();