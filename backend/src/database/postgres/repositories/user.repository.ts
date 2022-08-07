import { PostgresDataSource } from "../../postgres"
import { User } from "../entities/user.entity"

export const UserRepository = PostgresDataSource.getRepository(User);
