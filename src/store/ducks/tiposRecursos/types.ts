import { TipoFiltro } from 'src/store/ducks/base/types';

export interface TiposRecursosState {
  filterList: Array<TipoFiltro>;
  error?: string;
}
