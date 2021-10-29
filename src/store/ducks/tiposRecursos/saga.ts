import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from 'src/services/api';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import {
  tiposRecursosGetFilterError,
  tiposRecursosGetFilterRequest,
  tiposRecursosGetFilterSuccess,
} from 'src/store/ducks/tiposRecursos';

export function* sendGetFilterRequest(
  action: ReturnType<typeof tiposRecursosGetFilterRequest>
) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<RespostaApi<TipoFiltro>> = yield call(
      api.get,
      `TiposRecursos/v1/consultarParaFiltrosTela/${query}`
    );

    yield put(tiposRecursosGetFilterSuccess(response.data));
  } catch (error: any) {
    yield put(tiposRecursosGetFilterError(error));
  }
}

export default all([
  takeLatest(tiposRecursosGetFilterRequest, sendGetFilterRequest),
]);
