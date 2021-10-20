import { combineReducers } from '@reduxjs/toolkit';

import { sessionSlice } from 'src/store/ducks/login';
import { objetosSlice } from 'src/store/ducks/objetos';
import { perfisSlice } from 'src/store/ducks/perfis';
import { relatoriosSlice } from 'src/store/ducks/relatorios';
import { tiposRecursosSlice } from 'src/store/ducks/tiposRecursos';
import { usuariosSlice } from 'src/store/ducks/usuarios';

const rootReducer = combineReducers({
  objetos: objetosSlice.reducer,
  perfis: perfisSlice.reducer,
  relatorios: relatoriosSlice.reducer,
  session: sessionSlice.reducer,
  tiposRecursos: tiposRecursosSlice.reducer,
  usuarios: usuariosSlice.reducer,
});

export default rootReducer;
