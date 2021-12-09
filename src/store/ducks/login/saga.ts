import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from 'src/services/api';
import { UserLogin } from 'src/store/ducks/login/types';
import {
  loginRequest,
  loginSuccess,
  loginError,
  recoveryRequest,
  recoverySuccess,
  recoveryError,
} from 'src/store/ducks/login';

export function* sendLoginRequest(action: ReturnType<typeof loginRequest>) {
  try {
    const data = new URLSearchParams();
    data.append('desLogin', action.payload.desLogin);
    data.append('desSenha', action.payload.desSenha);

    const response: AxiosResponse<UserLogin> = yield call(
      api.post,
      'Auth/v1/login/',
      data,
      {
        headers: {
          'Content-Type': 'Application/x-www-form-urlencoded',
          client_id: 'n2mK7ztXlfLDUwH6L/Dz416DeeZQyB2tNlPEfmsQ0S0=',
        },
      }
    );

    yield put(loginSuccess(response.data));
  } catch (error: any) {
    yield put(loginError(error));
  }
}

export function* sendRecoveryRequest(
  action: ReturnType<typeof recoveryRequest>
) {
  try {
    const data = new URLSearchParams();
    data.append('desLogin', action.payload.desLogin);
    data.append('desEmail', action.payload.desEmail);

    const response: AxiosResponse<string> = yield call(
      api.post,
      'Auth/v1/recuperarSenha/',
      data,
      {
        headers: {
          'Content-Type': 'Application/x-www-form-urlencoded',
          client_id: 'n2mK7ztXlfLDUwH6L/Dz416DeeZQyB2tNlPEfmsQ0S0=',
        },
      }
    );

    yield put(recoverySuccess(response.data));
  } catch (error: any) {
    yield put(recoveryError(error));
  }
}

export default all([
  takeLatest(loginRequest.type, sendLoginRequest),
  takeLatest(recoveryRequest.type, sendRecoveryRequest),
]);
