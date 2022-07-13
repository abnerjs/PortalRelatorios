import { InfoPaginacao, TipoFiltro } from 'src/store/ducks/base/types';
import { ErrorAPI } from '../types';

export interface UsuariosPrestadoresState {
  data: Array<UsuarioPrestador>;
  filterList: Array<TipoFiltro>;
  pagination?: InfoPaginacao;
  error?: ErrorAPI;
  loading: boolean;
  operationError?: ErrorAPI;
  operationState?: string;
}

export interface UsuarioPrestador {
  idRelUsuario?: number;
  desNome?: string;
  codPrestador?: number;
  nomPrestador?: string;
  flgAtivo?: string;
}
