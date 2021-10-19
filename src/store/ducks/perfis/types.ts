import { InfoPaginacao, TipoFiltro } from 'src/store/ducks/base/types';

export interface PerfisState {
  data: Array<Perfil>;
  filterList: Array<TipoFiltro>;
  pagination?: InfoPaginacao;
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
