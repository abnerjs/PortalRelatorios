import { InfoPaginacao, TipoFiltro } from 'src/store/ducks/base/types';

export interface UsuariosState {
  data: Array<Usuario>;
  filterList: Array<TipoFiltro>;
  pagination?: InfoPaginacao;
  loading: boolean;
  error?: string;
  operationError?: string;
  operationState?: string;
  deleteError?: string;
  deleteState?: string;
  changePasswordError?: string;
  changePasswordState?: string;
}

export interface Usuario {
  idRelUsuario: number;
  idRelPerfil: number;
  desNome: string;
  desEmail?: string | null;
  desLogin: string;
  desSenha: string;
  desCpfCnpj?: string | null;
  codColaborador?: string | null;
  flgTipo: string;
  flgAtivo: string;
}

export interface ChangeUsuarioPasswordRequest {
  desLogin: string;
  desSenha: string;
  desNovaSenha: string;
  desConfirmaNovaSenha: string;
}