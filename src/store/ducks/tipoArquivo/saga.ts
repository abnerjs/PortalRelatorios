import { AxiosResponse } from 'axios';
import { all, call, debounce, put, takeLatest } from 'redux-saga/effects';

import api from 'src/services/api';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import {
  tipoArquivoGetRequest,
  tipoArquivoGetSuccess,
  tipoArquivoGetError,
  tipoArquivoGetFilterRequest,
  tipoArquivoGetFilterSuccess,
  tipoArquivoPostRequest,
  tipoArquivoPutRequest,
  tipoArquivoDeleteRequest,
  tipoArquivoOperationSuccess,
  tipoArquivoOperationError,
  tipoArquivoDeleteSuccess,
  tipoArquivoDeleteError,
} from 'src/store/ducks/tipoArquivo';
import { TipoArquivo } from 'src/store/ducks/tipoArquivo/types';

export function* sendGetRequest(action: ReturnType<typeof tipoArquivoGetRequest>) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<RespostaApi<TipoArquivo>> = yield call(
      api.get,
      `TiposArquivos/v1/${query}`
    );

    yield put(tipoArquivoGetSuccess(response.data));
  } catch (error: any) {
    yield put(tipoArquivoGetError(error));
  }
}

export function* sendGetFilterRequest(
  action: ReturnType<typeof tipoArquivoGetFilterRequest>
) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<RespostaApi<TipoFiltro>> = yield call(
      api.get,
      `TiposArquivos/v1/consultarParaFiltrosTela/${query}`
    );

    yield put(tipoArquivoGetFilterSuccess(response.data));
  } catch (error: any) {}
}

export function* sendPostRequest(action: ReturnType<typeof tipoArquivoPostRequest>) {
  try {
    yield call(api.post, `TiposArquivos/v1/`, action.payload);
    yield put(tipoArquivoOperationSuccess());
  } catch (error: any) {
    yield put(tipoArquivoOperationError(error));
  }
}

export function* sendPutRequest(action: ReturnType<typeof tipoArquivoPutRequest>) {
  try {
    yield call(api.put, `TiposArquivos/v1/`, action.payload);
    yield put(tipoArquivoOperationSuccess());
  } catch (error: any) {
    yield put(tipoArquivoOperationError(error));
  }
}

export function* sendDeleteRequest(
  action: ReturnType<typeof tipoArquivoDeleteRequest>
) {
  try {
    const query = `?idRelTpArquivo=${action.payload.idRelTpArquivo}`;

    yield call(api.delete, `TiposArquivos/v1/${query}`);
    yield put(tipoArquivoDeleteSuccess());
  } catch (error: any) {
    yield put(tipoArquivoDeleteError(error));
  }
}

export default all([
  debounce(500, tipoArquivoGetRequest, sendGetRequest),
  takeLatest(tipoArquivoGetFilterRequest, sendGetFilterRequest),
  takeLatest(tipoArquivoPostRequest, sendPostRequest),
  takeLatest(tipoArquivoPutRequest, sendPutRequest),
  takeLatest(tipoArquivoDeleteRequest, sendDeleteRequest),
]);
