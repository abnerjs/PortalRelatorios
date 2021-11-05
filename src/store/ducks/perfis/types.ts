import { InfoPaginacao, TipoFiltro } from 'src/store/ducks/base/types';

export interface PerfisState {
  data: Array<Perfil>;
  filterList: Array<TipoFiltro>;
  pagination?: InfoPaginacao;
  loading: boolean;
  error?: string;
  operationError?: string;
  operationState?: string;
  deleteError?: string;
  deleteState?: string;
}

export interface Perfil {
  idRelPerfil: number;
  desPerfil: string;
  lstPerfisObjetos: Array<PerfilObjeto>;
}

export interface PerfilObjeto {
  codObjeto: number;
  flgAcesso: string;
}
