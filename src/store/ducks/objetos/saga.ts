import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from 'src/services/api';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import { objetosGetFilterError, objetosGetFilterRequest, objetosGetFilterSuccess } from 'src/store/ducks/objetos';

export function* sendGetFilterRequest(action: ReturnType<typeof objetosGetFilterRequest>) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<RespostaApi<TipoFiltro>> = yield call(
      api.get,
      `Objetos/v1/consultarParaFiltrosTela/${query}`
    );

    yield put(objetosGetFilterSuccess(response.data));
  } catch (error: any) {
    yield put(objetosGetFilterError(error));
  }
}

export default all([takeLatest(objetosGetFilterRequest, sendGetFilterRequest)]);
