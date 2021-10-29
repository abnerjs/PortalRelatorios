import { TipoFiltro } from 'src/store/ducks/base/types';

export interface PrestadoresState {
  filterList: Array<TipoFiltro>;
  error?: string;
}
