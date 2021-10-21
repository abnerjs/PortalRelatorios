import { InfoPaginacao, TipoFiltro } from 'src/store/ducks/base/types';

export interface UsuariosPrestadoresState {
  data: Array<UsuarioPrestador>;
  filterList: Array<TipoFiltro>;
  pagination?: InfoPaginacao;
}

export interface UsuarioPrestador {
  idRelUsuario?: number;
  desNome?: string;
  codPrestador?: number;
  nomPrestador?: string;
  flgAtivo?: string;
}
