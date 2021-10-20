import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from 'src/services/api';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import {
  fazendasGetFilterRequest,
  fazendasGetFilterSuccess,
} from 'src/store/ducks/fazendas';

export function* sendGetFilterRequest(
  action: ReturnType<typeof fazendasGetFilterRequest>
) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<RespostaApi<TipoFiltro>> = yield call(
      api.get,
      `Fazendas/v1/consultarParaFiltrosTela/${query}`
    );

    yield put(fazendasGetFilterSuccess(response.data));
  } catch (error) {}
}

export default all([
  takeLatest(fazendasGetFilterRequest, sendGetFilterRequest),
]);
