import { AxiosResponse } from 'axios';
import { all, call, debounce, put, takeLatest } from 'redux-saga/effects';

import api from 'src/services/api';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import {
  perfisGetRequest,
  perfisGetSuccess,
  perfisGetFilterRequest,
  perfisGetFilterSuccess,
  perfisPostRequest,
  perfisPutRequest,
  perfisDeleteRequest,
} from 'src/store/ducks/perfis';
import { Perfil } from 'src/store/ducks/perfis/types';

export function* sendGetRequest(action: ReturnType<typeof perfisGetRequest>) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<RespostaApi<Perfil>> = yield call(
      api.get,
      `Perfis/v1/${query}`
    );

    yield put(perfisGetSuccess(response.data));
  } catch (error) {}
}

export function* sendGetFilterRequest(
  action: ReturnType<typeof perfisGetFilterRequest>
) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<RespostaApi<TipoFiltro>> = yield call(
      api.get,
      `Perfis/v1/consultarParaFiltrosTela/${query}`
    );

    yield put(perfisGetFilterSuccess(response.data));
  } catch (error) {}
}

export function* sendPostRequest(action: ReturnType<typeof perfisPostRequest>) {
  try {
    yield call(api.post, `Perfis/v1/`, action.payload);
  } catch (error) {}
}

export function* sendPutRequest(action: ReturnType<typeof perfisPutRequest>) {
  try {
    yield call(api.put, `Perfis/v1/`, action.payload);
  } catch (error) {}
}

export function* sendDeleteRequest(
  action: ReturnType<typeof perfisDeleteRequest>
) {
  try {
    const query = `?idRelPerfil=${action.payload.idRelPerfil}`;

    yield call(api.delete, `Perfis/v1/${query}`);
  } catch (error) {}
}

export default all([
  debounce(500, perfisGetRequest, sendGetRequest),
  takeLatest(perfisGetFilterRequest, sendGetFilterRequest),
  takeLatest(perfisPostRequest, sendPostRequest),
  takeLatest(perfisPutRequest, sendPutRequest),
  takeLatest(perfisDeleteRequest, sendDeleteRequest),
]);
