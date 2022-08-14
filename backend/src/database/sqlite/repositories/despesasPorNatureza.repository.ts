import { SqliteDataSource } from '../../sqlite';
import { DespesasPorNatureza } from '../entities/depesasPorNatureza.entity';

export const DespesasPorNaturezaRepository =
  SqliteDataSource.getRepository(DespesasPorNatureza);
