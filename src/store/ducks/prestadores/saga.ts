import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from 'src/services/api';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import {
  prestadoresGetFilterError,
  prestadoresGetFilterRequest,
  prestadoresGetFilterSuccess,
} from 'src/store/ducks/prestadores';

export function* sendGetFilterRequest(
  action: ReturnType<typeof prestadoresGetFilterRequest>
) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<RespostaApi<TipoFiltro>> = yield call(
      api.get,
      `Prestadores/v1/consultarParaFiltrosTela/${query}`
    );

    yield put(prestadoresGetFilterSuccess(response.data));
  } catch (error: any) {
    yield put(prestadoresGetFilterError(error));
  }
}

export default all([
  takeLatest(prestadoresGetFilterRequest, sendGetFilterRequest),
]);
