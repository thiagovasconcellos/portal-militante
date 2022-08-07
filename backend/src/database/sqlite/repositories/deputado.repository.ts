import { SqliteDataSource } from "../../sqlite"
import { Deputado } from "../entities/deputado.entity"

export const DeputadoRepository = SqliteDataSource.getRepository(Deputado);
