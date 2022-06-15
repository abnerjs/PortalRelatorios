import { AxiosResponse } from 'axios';
import { all, call, debounce, put, takeLatest } from 'redux-saga/effects';

import api from 'src/services/api';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import {
  usuariosGetRequest,
  usuariosGetSuccess,
  usuariosGetFilterRequest,
  usuariosGetFilterSuccess,
  usuariosPostRequest,
  usuariosPutRequest,
  usuariosDeleteRequest,
  usuariosOperationSuccess,
  usuariosOperationError,
  usuariosDeleteSuccess,
  usuariosDeleteError,
  usuariosGetError,
  changeUsuarioPasswordRequest,
  changeUsuarioPasswordSuccess,
  changeUsuarioPasswordError,
  usuariosGetFilterError,
  usuariosChangeFlagActiveRequest,
} from 'src/store/ducks/usuarios';
import { Usuario } from 'src/store/ducks/usuarios/types';
import { changeFlgPrimeiroAcesso, changeFlgTrocaSenha } from '../login';

export function* sendGetRequest(action: ReturnType<typeof usuariosGetRequest>) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<RespostaApi<Usuario>> = yield call(api.get, `Usuarios/v1/${query}`);

    yield put(usuariosGetSuccess(response.data));
  } catch (error: any) {
    yield put(usuariosGetError(error));
  }
}

export function* sendGetFilterRequest(action: ReturnType<typeof usuariosGetFilterRequest>) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<RespostaApi<TipoFiltro>> = yield call(
      api.get,
      `Usuarios/v1/consultarParaFiltrosTela/${query}`
    );

    yield put(usuariosGetFilterSuccess(response.data));
  } catch (error: any) {
    yield put(usuariosGetFilterError(error));
  }
}

export function* sendPostRequest(action: ReturnType<typeof usuariosPostRequest>) {
  try {
    yield call(api.post, `Usuarios/v1/`, action.payload);
    yield put(usuariosOperationSuccess());
  } catch (error: any) {
    yield put(usuariosOperationError(error));
  }
}

export function* sendPutRequest(action: ReturnType<typeof usuariosPutRequest>) {
  try {
    yield call(api.put, `Usuarios/v1/`, action.payload);
    yield put(usuariosOperationSuccess());
  } catch (error: any) {
    yield put(usuariosOperationError(error));
  }
}

export function* sendDeleteRequest(action: ReturnType<typeof usuariosDeleteRequest>) {
  try {
    const query = `?idRelUsuario=${action.payload.idRelUsuario}`;

    yield call(api.delete, `Usuarios/v1/${query}`);
    yield put(usuariosDeleteSuccess());
  } catch (error: any) {
    yield put(usuariosDeleteError(error));
  }
}

export function* sendChangePasswordRequest(action: ReturnType<typeof changeUsuarioPasswordRequest>) {
  try {
    yield call(api.post, `Usuarios/v1/alterarSenha/`, action.payload);
    yield put(changeUsuarioPasswordSuccess());
    yield put(changeFlgTrocaSenha());
    yield put(changeFlgPrimeiroAcesso());
  } catch (error: any) {
    yield put(changeUsuarioPasswordError(error));
  }
}

export function* sendChangeActiveFlagRequest(action: ReturnType<typeof usuariosChangeFlagActiveRequest>) {
  try {
    let u: Usuario = {
      codColaborador: action.payload.codColaborador,
      desLogin: action.payload.desLogin,
      desNome: action.payload.desNome,
      desSenha: action.payload.desSenha,
      flgAtivo: action.payload.flgAtivo === 'S' ? 'N' : 'S',
      flgTipo: action.payload.flgTipo,
      flgPrimeiroAcesso: action.payload.flgPrimeiroAcesso,
      flgTrocaSenha: action.payload.flgTrocaSenha,
      idRelPerfil: action.payload.idRelPerfil,
      idRelUsuario: action.payload.idRelUsuario,
      desCpfCnpj: action.payload.desCpfCnpj,
      desEmail: action.payload.desEmail,
    };

    yield call(api.put, `Usuarios/v1/`, u);
    yield put(usuariosOperationSuccess());
  } catch (error: any) {
    yield put(usuariosOperationError(error));
  }
}

export default all([
  debounce(500, usuariosGetRequest, sendGetRequest),
  takeLatest(usuariosGetFilterRequest, sendGetFilterRequest),
  takeLatest(usuariosPostRequest, sendPostRequest),
  takeLatest(usuariosPutRequest, sendPutRequest),
  takeLatest(usuariosChangeFlagActiveRequest, sendChangeActiveFlagRequest),
  takeLatest(usuariosDeleteRequest, sendDeleteRequest),
  takeLatest(changeUsuarioPasswordRequest, sendChangePasswordRequest),
]);
