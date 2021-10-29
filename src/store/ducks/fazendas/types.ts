import { TipoFiltro } from 'src/store/ducks/base/types';

export interface FazendasState {
  filterList: Array<TipoFiltro>;
  error?: string;
}
