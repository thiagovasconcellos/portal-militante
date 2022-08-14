import { PostgresDataSource } from "../../postgres"
import { UserFavorites } from "../entities/user.favorites.entity"; 

export const UserFavoritesRepository = PostgresDataSource.getRepository(UserFavorites);
