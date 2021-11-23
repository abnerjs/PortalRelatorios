import { all } from 'redux-saga/effects';

import fazendasSaga from 'src/store/ducks/fazendas/saga';
import fornecedoresSaga from 'src/store/ducks/fornecedores/saga';
import loginSaga from 'src/store/ducks/login/saga';
import objetosSaga from 'src/store/ducks/objetos/saga';
import perfisSaga from 'src/store/ducks/perfis/saga';
import prestadoresSaga from 'src/store/ducks/prestadores/saga';
import relatoriosSaga from 'src/store/ducks/relatorios/saga';
import tiposRecursosSaga from 'src/store/ducks/tiposRecursos/saga';
import usuariosFornecedoresSaga from 'src/store/ducks/usuariosFornecedores/saga';
import usuariosPrestadoresSaga from 'src/store/ducks/usuariosPrestadores/saga';
import usuariosSaga from 'src/store/ducks/usuarios/saga';
import tipoArquivoSaga from 'src/store/ducks/tipoArquivo/saga';

export default function* rootSaga(): any {
  return yield all([
    fazendasSaga,
    fornecedoresSaga,
    loginSaga,
    objetosSaga,
    perfisSaga,
    prestadoresSaga,
    relatoriosSaga,
    tiposRecursosSaga,
    usuariosFornecedoresSaga,
    usuariosPrestadoresSaga,
    usuariosSaga,
    tipoArquivoSaga,
  ]);
}
