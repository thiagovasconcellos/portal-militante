import { DespesasPorNaturezaRepository } from '../../database/sqlite/repositories/despesasPorNatureza.repository';
import { DeputadoRepository } from '../../database/sqlite/repositories/deputado.repository';
import { currency, nFormatter } from '../../helpers';

interface IResponse {
  orcamentoAprovado: string;
  totalGasto: string;
  totalGastoFormatado: any;
  totalParlamentares: number;
  totalPartidos: number;
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

    return {
      orcamentoAprovado,
      totalGasto: currency(totalGasto.sum),
      totalGastoFormatado: nFormatter(totalGasto.sum, 1),
      totalParlamentares: totalParlamentares.count,
      totalPartidos: totalPartidos.count,
    };
  }
}

export default new DashboardListService();
