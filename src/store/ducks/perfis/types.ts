import { InfoPaginacao, TipoFiltro } from 'src/store/ducks/base/types';
import { ErrorAPI } from '../types';

export interface PerfisState {
  data: Array<Perfil>;
  filterList: Array<TipoFiltro>;
  pagination?: InfoPaginacao;
  loading: boolean;
  error?: ErrorAPI;
  operationError?: ErrorAPI;
  operationState?: string;
  deleteError?: ErrorAPI;
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
