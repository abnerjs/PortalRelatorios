import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from 'src/services/api';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import {
  usuariosFornecedoresGetRequest,
  usuariosFornecedoresGetSuccess,
  usuariosFornecedoresGetFilterRequest,
  usuariosFornecedoresGetFilterSuccess,
  usuariosFornecedoresPostRequest,
  usuariosFornecedoresPutRequest,
  usuariosFornecedoresDeleteRequest,
} from 'src/store/ducks/usuariosFornecedores';
import { UsuarioFornecedor } from 'src/store/ducks/usuariosFornecedores/types';

export function* sendGetRequest(
  action: ReturnType<typeof usuariosFornecedoresGetRequest>
) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<RespostaApi<UsuarioFornecedor>> = yield call(
      api.get,
      `UsuariosFornecedores/v1/${query}`
    );

    yield put(usuariosFornecedoresGetSuccess(response.data));
  } catch (error) {}
}

export function* sendGetFilterRequest(
  action: ReturnType<typeof usuariosFornecedoresGetFilterRequest>
) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<RespostaApi<TipoFiltro>> = yield call(
      api.get,
      `UsuariosFornecedores/v1/consultarParaFiltrosTela/${query}}`
    );

    yield put(usuariosFornecedoresGetFilterSuccess(response.data));
  } catch (error) {}
}

export function* sendPostRequest(
  action: ReturnType<typeof usuariosFornecedoresPostRequest>
) {
  try {
    yield call(api.post, `UsuariosFornecedores/v1/`, action.payload);
  } catch (error) {}
}

export function* sendPutRequest(
  action: ReturnType<typeof usuariosFornecedoresPutRequest>
) {
  try {
    yield call(api.put, `UsuariosFornecedores/v1/`, action.payload);
  } catch (error) {}
}

export function* sendDeleteRequest(
  action: ReturnType<typeof usuariosFornecedoresDeleteRequest>
) {
  try {
    const { idRelUsuario, codFornecedor } = action.payload;

    const query = `?idRelUsuario=${idRelUsuario}&codFornecedor=${codFornecedor}`;

    yield call(api.delete, `UsuariosFornecedores/v1/${query}`);
  } catch (error) {}
}

export default all([
  takeLatest(usuariosFornecedoresGetRequest, sendGetRequest),
  takeLatest(usuariosFornecedoresGetFilterRequest, sendGetFilterRequest),
  takeLatest(usuariosFornecedoresPostRequest, sendPostRequest),
  takeLatest(usuariosFornecedoresPutRequest, sendPutRequest),
  takeLatest(usuariosFornecedoresDeleteRequest, sendDeleteRequest),
]);
