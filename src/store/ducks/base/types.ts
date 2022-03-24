
export type RespostaApi<T> = {
  dados: Array<T>;
  paginacao?: InfoPaginacao;
};

export type TipoFiltro = {
  codigo: string;
  descricao: string;
  flgAtivo: string;
};

export type InfoPaginacao = {
  numRegInicial?: number;
  numRegFinal?: number;
  numPagina?: number;
  totRegistros?: number;
  itensPorPagina?: number;
};

export type InfoPesquisaProps = {
  numPagina?: number;
  itensPorPagina?: number;
  filtroPadrao?: string;
  novaOrdenacao?: string;
};

export type InfoPesquisa = InfoPesquisaProps & {
  parametrosPersonalizados: Map<string, string>;
  clone(): InfoPesquisa;
  setParameter(key: string, value: string): void;
  removeParameter(key: string): void;
  clearAllParameters(): void;
};
