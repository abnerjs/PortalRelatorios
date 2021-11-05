import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from 'src/services/api';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import {
  usuariosPrestadoresGetRequest,
  usuariosPrestadoresGetSuccess,
  usuariosPrestadoresGetFilterRequest,
  usuariosPrestadoresGetFilterSuccess,
  usuariosPrestadoresPostRequest,
  usuariosPrestadoresPutRequest,
  usuariosPrestadoresDeleteRequest,
  usuariosPrestadoresGetError,
  usuariosPrestadoresOperationSuccess,
  usuariosPrestadoresOperationError,
  usuariosPrestadoresDeleteError,
  usuariosPrestadoresDeleteSuccess,
} from 'src/store/ducks/usuariosPrestadores';
import { UsuarioPrestador } from 'src/store/ducks/usuariosPrestadores/types';

export function* sendGetRequest(
  action: ReturnType<typeof usuariosPrestadoresGetRequest>
) {
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

export function* sendGetFilterRequest(
  action: ReturnType<typeof usuariosPrestadoresGetFilterRequest>
) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<RespostaApi<TipoFiltro>> = yield call(
      api.get,
      `UsuariosPrestadores/v1/consultarParaFiltrosTela/${query}}`
    );

    yield put(usuariosPrestadoresGetFilterSuccess(response.data));
  } catch (error) {}
}

export function* sendPostRequest(
  action: ReturnType<typeof usuariosPrestadoresPostRequest>
) {
  try {
    yield call(api.post, `UsuariosPrestadores/v1/`, action.payload);
    yield put(usuariosPrestadoresOperationSuccess());
  } catch (error: any) {
    yield put(usuariosPrestadoresOperationError(error));
  }
}

export function* sendPutRequest(
  action: ReturnType<typeof usuariosPrestadoresPutRequest>
) {
  try {
    yield call(api.put, `UsuariosPrestadores/v1/`, action.payload);
    yield put(usuariosPrestadoresOperationSuccess());
  } catch (error: any) {
    yield put(usuariosPrestadoresOperationError(error));
  }
}

export function* sendDeleteRequest(
  action: ReturnType<typeof usuariosPrestadoresDeleteRequest>
) {
  try {
    const { idRelUsuario, codPrestador } = action.payload;

    const query = `?idRelUsuario=${idRelUsuario}&codPrestador=${codPrestador}`;

    yield call(api.delete, `UsuariosPrestadores/v1/${query}`);
    yield put(usuariosPrestadoresDeleteSuccess());
  } catch (error: any) {
    yield put(usuariosPrestadoresDeleteError(error));
  }
}

export default all([
  takeLatest(usuariosPrestadoresGetRequest, sendGetRequest),
  takeLatest(usuariosPrestadoresGetFilterRequest, sendGetFilterRequest),
  takeLatest(usuariosPrestadoresPostRequest, sendPostRequest),
  takeLatest(usuariosPrestadoresPutRequest, sendPutRequest),
  takeLatest(usuariosPrestadoresDeleteRequest, sendDeleteRequest),
]);
