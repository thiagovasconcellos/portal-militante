import { Request, Response } from 'express';
import { DeputadoRepository } from '../../database/sqlite/repositories/deputado.repository';
import { DeputadoPerfilRepository } from '../../database/sqlite/repositories/deputadoPerfil.repository';
import AppError from '../../errors/AppError';

export class DeputadoController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { group } = request.query;
    const deputados = await DeputadoRepository.find();
    if (group === 'legislatura') {
      const groupBy: any = {
        '14': [],
        '15': [],
        '16': [],
        '17': [],
        '18': [],
        '19': [],
      };

      deputados.forEach((deputado) => {
        groupBy[deputado.legislatura].push(deputado);
      });

      return response.json(groupBy);
    }
    if (group === 'periodo') {
      const groupBy: any = {
        '1999-2003': [],
        '2003-2007': [],
        '2007-2011': [],
        '2011-2015': [],
        '2015-2019': [],
        '2019-2022': [],
      };

      deputados.forEach((deputado) => {
        groupBy[deputado.periodo].push(deputado);
      });

      return response.json(groupBy);
    }
    if (group === 'partido') {
      const groupBy: any = {};

      deputados.forEach((deputado) => {
        groupBy[deputado.partido]
          ? groupBy[deputado.partido].push(deputado)
          : (groupBy[deputado.partido] = []);
      });

      return response.json(groupBy);
    }
    return response.json(deputados);
  }

  public async last(request: Request, response: Response): Promise<Response> {
    const { group, legislatura } = request.query;
    const deputados = await DeputadoRepository.find({
      where: {
        legislatura: Number(legislatura),
      },
    });
    if (group === 'legislatura') {
      const groupBy: any = {
        '14': [],
        '15': [],
        '16': [],
        '17': [],
        '18': [],
        '19': [],
      };

      deputados.forEach((deputado) => {
        groupBy[deputado.legislatura].push(deputado);
      });

      return response.json(groupBy);
    }
    if (group === 'periodo') {
      const groupBy: any = {
        '1999-2003': [],
        '2003-2007': [],
        '2007-2011': [],
        '2011-2015': [],
        '2015-2019': [],
        '2019-2022': [],
      };

      deputados.forEach((deputado) => {
        groupBy[deputado.periodo].push(deputado);
      });

      return response.json(groupBy);
    }
    if (group === 'partido') {
      const groupBy: any = {};

      deputados.forEach((deputado) => {
        groupBy[deputado.partido]
          ? groupBy[deputado.partido].push(deputado)
          : (groupBy[deputado.partido] = []);
      });

      return response.json(groupBy);
    }
    return response.json(deputados);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { matricula } = request.params;

    const deputado = await DeputadoRepository.find({
      where: {
        matricula,
      },
    });

    if (!deputado) {
      throw new AppError('Unable to locate deputy with given id');
    }

    const deputadoPerfil = await DeputadoPerfilRepository.findOne({
      where: {
        matricula,
      },
    });

    const allPartidos: string[] = [];
    const legislaturas: number[] = [];
    const periodos: string[] = [];

    deputado.forEach((i) => {
      if (i.partido) allPartidos.push(i.partido);
      legislaturas.push(i.legislatura);
      periodos.push(i.periodo);
    });

    const partidos = [...new Set(allPartidos)];

    const payload = {
      matricula,
      nome: deputado[0].deputado,
      avatar: deputadoPerfil?.avatar,
      biografia: deputadoPerfil?.biografia,
      email: deputadoPerfil?.email,
      telefone: deputadoPerfil?.telefone,
      partidos,
      legislaturas,
      periodos,
      perfilCompleto: `https://www.al.sp.gov.br/deputado/?matricula=${matricula}`,
    };

    return response.status(200).json(payload);
  }
}
