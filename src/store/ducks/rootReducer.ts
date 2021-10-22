import { combineReducers } from '@reduxjs/toolkit';

import { fornecedoresSlice } from 'src/store/ducks/fornecedores';
import { objetosSlice } from 'src/store/ducks/objetos';
import { perfisSlice } from 'src/store/ducks/perfis';
import { prestadoresSlice } from 'src/store/ducks/prestadores';
import { sessionSlice } from 'src/store/ducks/login';
import { usuariosFornecedoresSlice } from 'src/store/ducks/usuariosFornecedores';
import { usuariosPrestadoresSlice } from 'src/store/ducks/usuariosPrestadores';
import { usuariosSlice } from 'src/store/ducks/usuarios';

const rootReducer = combineReducers({
  fornecedores: fornecedoresSlice.reducer,
  objetos: objetosSlice.reducer,
  perfis: perfisSlice.reducer,
  prestadores: prestadoresSlice.reducer,
  session: sessionSlice.reducer,
  usuarios: usuariosSlice.reducer,
  usuariosFornecedores: usuariosFornecedoresSlice.reducer,
  usuariosPrestadores: usuariosPrestadoresSlice.reducer,
});

export default rootReducer;
