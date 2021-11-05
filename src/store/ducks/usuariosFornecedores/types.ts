import { InfoPaginacao, TipoFiltro } from 'src/store/ducks/base/types';

export interface UsuariosFornecedoresState {
  data: Array<UsuarioFornecedor>;
  filterList: Array<TipoFiltro>;
  pagination?: InfoPaginacao;
  error?: string;
  loading: boolean;
  operationError?: string;
  operationState?: string;
  deleteError?: string;
  deleteState?: string;
}

export interface UsuarioFornecedor {
  idRelUsuario?: number;
  desNome?: string;
  codFornecedor?: number;
  desFornecedor?: string;
  flgAtivo?: string;
}
