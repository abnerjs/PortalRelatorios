import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from 'src/services/api';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import {
  usuariosPrestadoresGetRequest,
  usuariosPrestadoresGetSuccess,
  usuariosPrestadoresPutRequest,
  usuariosPrestadoresGetError,
  usuariosPrestadoresOperationSuccess,
  usuariosPrestadoresOperationError,
} from 'src/store/ducks/usuariosPrestadores';
import { UsuarioPrestador } from 'src/store/ducks/usuariosPrestadores/types';

export function* sendGetRequest(action: ReturnType<typeof usuariosPrestadoresGetRequest>) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<RespostaApi<UsuarioPrestador>> = yield call(
      api.get,
      `UsuariosPrestadores/v1/${query}`
    );

    yield put(usuariosPrestadoresGetSuccess(response.data));
  } catch (error: any) {
    yield put(usuariosPrestadoresGetError(error));
  }
}

export function* sendPutRequest(action: ReturnType<typeof usuariosPrestadoresPutRequest>) {
  try {
    yield call(api.put, `UsuariosPrestadores/v1/`, action.payload);
    yield put(usuariosPrestadoresOperationSuccess());
  } catch (error: any) {
    yield put(usuariosPrestadoresOperationError(error));
  }
}

export default all([
  takeLatest(usuariosPrestadoresGetRequest, sendGetRequest),
  takeLatest(usuariosPrestadoresPutRequest, sendPutRequest),
]);
