import { InfoPaginacao, TipoFiltro } from 'src/store/ducks/base/types';
import { ErrorAPI } from '../types';

export interface UsuariosFornecedoresState {
  data: Array<UsuarioFornecedor>;
  filterList: Array<TipoFiltro>;
  pagination?: InfoPaginacao;
  error?: ErrorAPI;
  loading: boolean;
  operationError?: ErrorAPI;
  operationState?: string;
  deleteError?: ErrorAPI;
  deleteState?: string;
}

export interface UsuarioFornecedor {
  idRelUsuario?: number;
  desNome?: string;
  codFornecedor?: number;
  desFornecedor?: string;
  flgAtivo?: string;
}
