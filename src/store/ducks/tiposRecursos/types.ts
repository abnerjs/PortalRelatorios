import { TipoFiltro } from 'src/store/ducks/base/types';
import { ErrorAPI } from '../types';

export interface TiposRecursosState {
  filterList: Array<TipoFiltro>;
  error?: ErrorAPI;
}
