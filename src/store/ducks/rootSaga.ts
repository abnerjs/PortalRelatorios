import { all } from 'redux-saga/effects';

import fornecedoresSaga from 'src/store/ducks/fornecedores/saga';
import loginSaga from 'src/store/ducks/login/saga';
import objetosSaga from 'src/store/ducks/objetos/saga';
import perfisSaga from 'src/store/ducks/perfis/saga';
import prestadoresSaga from 'src/store/ducks/prestadores/saga';
import usuariosFornecedoresSaga from 'src/store/ducks/usuariosFornecedores/saga';
import usuariosPrestadoresSaga from 'src/store/ducks/usuariosPrestadores/saga';
import usuariosSaga from 'src/store/ducks/usuarios/saga';

export default function* rootSaga(): any {
  return yield all([
    fornecedoresSaga,
    loginSaga,
    objetosSaga,
    perfisSaga,
    prestadoresSaga,
    usuariosFornecedoresSaga,
    usuariosPrestadoresSaga,
    usuariosSaga,
  ]);
}
