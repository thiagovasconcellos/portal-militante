import { DespesasPorNaturezaRepository } from '../../database/sqlite/repositories/despesasPorNatureza.repository';
import { DeputadoRepository } from '../../database/sqlite/repositories/deputado.repository';
import { currency, nFormatter } from '../../helpers';
import {
  getTotalPorDeputado,
  getTotalPorFornecedor,
  getTotalPorNaturezaDespesa,
  getTotalPorPartido,
} from './helpers';

interface IResponse {
  orcamentoAprovado: string;
  totalGasto: string;
  totalGastoFormatado: any;
  totalParlamentares: number;
  totalPartidos: number;
  totalGastoPartido: any;
  totalGastoPorDeputado: any;
  totalPorNaturezaDespesa: any;
  totalPorFornecedor: any;
}

class DashboardListService {
  public async execute(): Promise<IResponse> {
    const orcamentoAprovado = '';
    const totalGasto = await DespesasPorNaturezaRepository.createQueryBuilder(
      'totalGasto',
    )
      .select('SUM(totalGasto.valor)', 'sum')
      .getRawOne();

    const totalParlamentares = await DeputadoRepository.createQueryBuilder(
      'parlamentares',
    )
      .select('COUNT(distinct(parlamentares.deputado))', 'count')
      .getRawOne();

    const totalPartidos = await DeputadoRepository.createQueryBuilder(
      'partidos',
    )
      .select('COUNT(distinct(partidos.partido))', 'count')
      .getRawOne();

    const totalGastoPartido = await getTotalPorPartido();
    const totalGastoPorDeputado = await getTotalPorDeputado();
    const totalPorNaturezaDespesa = await getTotalPorNaturezaDespesa();
    const totalPorFornecedor = await getTotalPorFornecedor();

    return {
      orcamentoAprovado,
      totalGasto: currency(totalGasto.sum),
      totalGastoFormatado: nFormatter(totalGasto.sum, 1),
      totalParlamentares: totalParlamentares.count,
      totalPartidos: totalPartidos.count,
      totalGastoPartido,
      totalGastoPorDeputado,
      totalPorNaturezaDespesa,
      totalPorFornecedor,
    };
  }
}

export default new DashboardListService();
