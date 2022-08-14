import { SqliteDataSource } from '../../database/sqlite';
import { currency } from '../../helpers';

const queryRunner = SqliteDataSource.createQueryRunner();

export async function getTotalPorPartido(): Promise<any[]> {
  const result: any[] = [];
  const queryDespesas = await queryRunner.manager.query(`
    select 
      matricula, 
      sum (valor) as valor
    from 
      despesasPorNatureza nat 
    group by 
      matricula 
    order by 
      valor desc
  `);

  const queryDeputados = await queryRunner.manager.query(`
    select 
      matricula, 
      partido 
    from 
      deputados 
    where 
      partido not in ('', ' ') 
    group by 
      matricula, 
      partido 
    order by 
      matricula
  `);

  for (const deputado of queryDeputados) {
    const { matricula, partido } = deputado;
    const filtered = queryDespesas.find((c: any) => c.matricula === matricula);
    if (filtered) {
      const { valor } = filtered;
      const exists = result.find((c: any) => c.partido === partido);
      if (exists) {
        exists.total = exists.total + valor;
      } else {
        result.push({
          partido,
          total: valor,
        });
      }
    }
  }

  result.sort((a, b) => parseFloat(b.total) - parseFloat(a.total));

  result.forEach((r) => (r.total = currency(r.total)));

  return result;
}

export async function getTotalPorDeputado(): Promise<any[]> {
  const result: any[] = [];
  const queryDespesas = await queryRunner.manager.query(`
    select 
      matricula, 
      sum (valor) as valor
    from 
      despesasPorNatureza nat 
    group by 
      matricula 
    order by 
      valor desc
  `);

  const queryDeputados = await queryRunner.manager.query(`
    select 
      matricula, 
      deputado as dep
    from 
      deputados 
    group by 
      matricula
    order by 
      matricula
  `);

  for (const deputado of queryDeputados) {
    const { matricula, dep } = deputado;
    const filtered = queryDespesas.find((c: any) => c.matricula === matricula);
    if (filtered) {
      const { valor } = filtered;
      const exists = result.find((c: any) => c.dep === dep);
      if (exists) {
        exists.total = exists.total + valor;
      } else {
        result.push({
          dep,
          total: valor,
        });
      }
    }
  }

  result.sort((a, b) => parseFloat(b.total) - parseFloat(a.total));

  result.forEach((r) => (r.total = currency(r.total)));

  return result;
}

export async function getTotalPorNaturezaDespesa(): Promise<any[]> {
  const queryDespesas = (await queryRunner.manager.query(`
    select 
      naturezaDespesas as 'naturezaDespesa', 
      sum(valor) as 'valor' 
    from 
      despesasPorNatureza 
    group by 
      naturezaDespesas 
    order by 
      valor desc
  `)) as any[];

  queryDespesas.forEach((c: any) => (c.valor = currency(c.valor)));

  return queryDespesas;
}

export async function getTotalPorFornecedor(): Promise<any[]> {
  const queryDespesas = (await queryRunner.manager.query(`
    select 
      fornecedor, 
      cpfCnpj, 
      sum(valor) as 'valor' 
    from 
      despesasPorFornecedor 
    group by 
      cpfCnpj 
    order by 
      valor desc
    limit 100
  `)) as any[];

  queryDespesas.forEach((c: any) => (c.valor = currency(c.valor)));

  return queryDespesas;
}
