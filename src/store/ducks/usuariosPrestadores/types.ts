import { InfoPaginacao, TipoFiltro } from 'src/store/ducks/base/types';

export interface UsuariosPrestadoresState {
  data: Array<UsuarioPrestador>;
  filterList: Array<TipoFiltro>;
  pagination?: InfoPaginacao;
  error?: string;
  loading: boolean;
  operationError?: string;
  operationState?: string;
  deleteError?: string;
  deleteState?: string;
}

export interface UsuarioPrestador {
  idRelUsuario?: number;
  desNome?: string;
  codPrestador?: number;
  nomPrestador?: string;
  flgAtivo?: string;
}
