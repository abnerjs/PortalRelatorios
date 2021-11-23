import { InfoPaginacao, TipoFiltro } from "../base/types";

export interface TipoArquivoState {
  data: Array<TipoArquivo>;
  filterList: Array<TipoFiltro>;
  pagination?: InfoPaginacao;
  error?: string;
  loading: boolean;
  operationError?: string;
  operationState?: string;
  deleteError?: string;
  deleteState?: string;
}

export interface TipoArquivo {
  idRelTpArquivo: number;
  desTpArquivo: string;
  flgReferencia: ReferenciaTipoArquivo;
}

enum ReferenciaTipoArquivo {
  A = "A",
  M = "M",
  D = "D",
  P = "P",
}