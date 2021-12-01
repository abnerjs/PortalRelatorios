import { combineReducers } from '@reduxjs/toolkit';

import { fazendasSlice } from 'src/store/ducks/fazendas';
import { fornecedoresSlice } from 'src/store/ducks/fornecedores';
import { objetosSlice } from 'src/store/ducks/objetos';
import { perfisSlice } from 'src/store/ducks/perfis';
import { prestadoresSlice } from 'src/store/ducks/prestadores';
import { relatoriosSlice } from 'src/store/ducks/relatorios';
import { sessionSlice } from 'src/store/ducks/login';
import { tiposRecursosSlice } from 'src/store/ducks/tiposRecursos';
import { usuariosFornecedoresSlice } from 'src/store/ducks/usuariosFornecedores';
import { usuariosPrestadoresSlice } from 'src/store/ducks/usuariosPrestadores';
import { usuariosSlice } from 'src/store/ducks/usuarios';
import { tipoArquivoSlice } from './tipoArquivo';
import { arquivoUploadSlice } from './relatoriosUpload';

const rootReducer = combineReducers({
  fazendas: fazendasSlice.reducer,
  fornecedores: fornecedoresSlice.reducer,
  objetos: objetosSlice.reducer,
  perfis: perfisSlice.reducer,
  prestadores: prestadoresSlice.reducer,
  relatorios: relatoriosSlice.reducer,
  session: sessionSlice.reducer,
  tiposRecursos: tiposRecursosSlice.reducer,
  usuarios: usuariosSlice.reducer,
  usuariosFornecedores: usuariosFornecedoresSlice.reducer,
  usuariosPrestadores: usuariosPrestadoresSlice.reducer,
  tipoArquivo: tipoArquivoSlice.reducer,
  arquivoUpload: arquivoUploadSlice.reducer,
});

export default rootReducer;
