import { TipoFiltro } from 'src/store/ducks/base/types';
import { ErrorAPI } from '../types';

export interface PrestadoresState {
  filterList: Array<TipoFiltro>;
  error?: ErrorAPI;
}
