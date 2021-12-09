import { InfoPaginacao, TipoFiltro } from '../base/types';
import { ErrorAPI } from '../types';

export interface TipoArquivoState {
  data: Array<TipoArquivo>;
  filterList: Array<TipoFiltro>;
  pagination?: InfoPaginacao;
  error?: ErrorAPI;
  loading: boolean;
  operationError?: ErrorAPI;
  operationState?: string;
  deleteError?: ErrorAPI;
  deleteState?: string;
}

export interface TipoArquivo {
  idRelTpArquivo: number;
  desTpArquivo: string;
  flgReferencia: string | null;
}
