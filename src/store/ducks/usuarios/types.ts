import { InfoPaginacao, TipoFiltro } from 'src/store/ducks/base/types';
import { ErrorAPI } from '../types';

export interface UsuariosState {
  data: Array<Usuario>;
  filterList: Array<TipoFiltro>;
  pagination?: InfoPaginacao;
  loading: boolean;
  error?: ErrorAPI;
  operationError?: ErrorAPI;
  operationState?: string;
  deleteError?: ErrorAPI;
  deleteState?: string;
  changePasswordError?: ErrorAPI;
  changePasswordState?: string;
  changePasswordFromRequestError?: ErrorAPI,
  changePasswordFromRequestState?: string,
}

export interface Usuario {
  idRelUsuario: number;
  idRelPerfil: number;
  desNome: string;
  desEmail?: string | null;
  desLogin: string;
  desSenha?: string;
  desCpfCnpj?: string | null;
  codColaborador?: string | null;
  flgTipo: string;
  flgAtivo: string;
  flgPrimeiroAcesso?: string;
  flgTrocaSenha?: string;
}

export interface ChangeUsuarioPasswordRequest {
  desSenha: string;
  desNovaSenha: string;
  desConfirmaNovaSenha: string;
}

export interface ChangePasswordFromRecoveryRequest {
  desNovaSenha: string;
  desConfirmaNovaSenha: string;
  Authorization?: string;
}
