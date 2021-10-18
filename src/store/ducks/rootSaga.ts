import { all } from 'redux-saga/effects';

import loginSaga from 'src/store/ducks/login/saga';
import objetosSaga from 'src/store/ducks/objetos/saga';
import perfisSaga from 'src/store/ducks/perfis/saga';
import usuariosSaga from 'src/store/ducks/usuarios/saga';

export default function* rootSaga(): any {
  return yield all([loginSaga, objetosSaga, perfisSaga, usuariosSaga]);
}
