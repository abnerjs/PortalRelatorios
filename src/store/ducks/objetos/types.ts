import { TipoFiltro } from 'src/store/ducks/base/types';
import { ErrorAPI } from '../types';

export interface ObjetosState {
  filterList: Array<TipoFiltro>;
  error?: ErrorAPI;
}
