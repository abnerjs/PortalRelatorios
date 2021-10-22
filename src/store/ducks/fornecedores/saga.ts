import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from 'src/services/api';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import {
  fornecedoresGetFilterRequest,
  fornecedoresGetFilterSuccess,
} from 'src/store/ducks/fornecedores';

export function* sendGetFilterRequest(
  action: ReturnType<typeof fornecedoresGetFilterRequest>
) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<RespostaApi<TipoFiltro>> = yield call(
      api.get,
      `Fornecedores/v1/consultarParaFiltrosTela/${query}`
    );

    yield put(fornecedoresGetFilterSuccess(response.data));
  } catch (error) {}
}

export default all([
  takeLatest(fornecedoresGetFilterRequest, sendGetFilterRequest),
]);
