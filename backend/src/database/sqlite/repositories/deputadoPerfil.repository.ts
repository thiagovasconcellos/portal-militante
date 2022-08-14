import { SqliteDataSource } from '../../sqlite';
import { DeputadoPerfil } from '../entities/deputadoPerfil.entity';

export const DeputadoPerfilRepository =
  SqliteDataSource.getRepository(DeputadoPerfil);
