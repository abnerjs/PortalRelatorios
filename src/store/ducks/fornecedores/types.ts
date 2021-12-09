import { TipoFiltro } from 'src/store/ducks/base/types';
import { ErrorAPI } from '../types';

export interface FornecedoresState {
  filterList: Array<TipoFiltro>;
  error?: ErrorAPI;
}
