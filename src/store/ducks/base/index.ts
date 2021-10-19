import { InfoPaginacao, InfoPesquisa } from 'src/store/ducks/base/types';

abstract class Paginacao implements InfoPaginacao {
  public numRegInicial = 0;
  public numRegFinal = 0;
  public numPagina = 1;
  public totRegistros = 0;
  public itensPorPagina = 10;

  public static getValoresPadrao(): InfoPaginacao {
    return {
      numRegInicial: 0,
      numRegFinal: 0,
      numPagina: 1,
      totRegistros: 0,
      itensPorPagina: 10,
    };
  }
}

class Pesquisa implements InfoPesquisa {
  public numPagina = 0;
  public itensPorPagina = 0;
  public filtroPadrao = '';
  public novaOrdenacao = '';

  public parametrosPersonalizados = new Map<string, string>();

  public constructor(
    values?: Partial<InfoPesquisa>,
    params?: Array<{ key: string; value: string }>
  ) {
    if (values) {
      Object.assign(this, values);
    }

    if (params && params.length > 0) {
      params.forEach((param) => {
        this.parametrosPersonalizados.set(param.key, param.value);
      });
    }
  }

  public toString(): string {
    let stringPesquisa = '';

    stringPesquisa = stringPesquisa.concat(
      `?numPagina=${this.numPagina > 0 ? this.numPagina : ''}`
    );

    stringPesquisa = stringPesquisa.concat(
      `&itensPorPagina=${this.itensPorPagina > 0 ? this.itensPorPagina : ''}`
    );

    stringPesquisa = stringPesquisa.concat(
      `&filtroPadrao=${this.filtroPadrao ?? ''}`
    );

    stringPesquisa = stringPesquisa.concat(
      `&novaOrdenacao=${this.novaOrdenacao ?? ''}`
    );

    for (const [key, value] of this.parametrosPersonalizados) {
      stringPesquisa = stringPesquisa.concat(`&${key}=${value ?? ''}`);
    }

    return stringPesquisa;
  }

  public clone(): InfoPesquisa {
    const entries = this.parametrosPersonalizados.entries();

    return new Pesquisa({
      numPagina: this.numPagina,
      itensPorPagina: this.itensPorPagina,
      filtroPadrao: this.filtroPadrao,
      novaOrdenacao: this.novaOrdenacao,

      parametrosPersonalizados: new Map<string, string>(entries),
    });
  }

  public setParameter(key: string, value: string): void {
    this.parametrosPersonalizados.set(key, value);
  }

  public removeParameter(key: string): void {
    this.parametrosPersonalizados.delete(key);
  }

  public clearAllParameters(): void {
    this.parametrosPersonalizados.clear();
  }
}

export { Paginacao, Pesquisa };
