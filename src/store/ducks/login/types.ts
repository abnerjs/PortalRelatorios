import { ErrorAPI } from '../types';

export interface SessionState {
  user: UserLogin | null;
  objetos: Array<Objeto>;
  authenticated: boolean;
  error?: ErrorAPI;
  message?: string;
  operationState: string;
  loading: boolean;
}

export interface LoginRequest {
  desLogin: string;
  desSenha: string;
}

export interface RecoveryRequest {
  desLogin: string;
  desEmail: string;
}

export interface UserLogin {
  nomUsuario: string;
  desLogin: string;
  flgTipo: string;
  versaoApi: string;
  accessToken: string;
  lstSistemas: Array<Sistema>;
}

export interface Sistema {
  nomSistema: string;
  lstTiposObjetos: Array<TipoObjeto>;
}

export interface TipoObjeto {
  flgTipo: string;
  desTipo: string;
  flgMapeado: string;
  lstObjetos: Array<Objeto>;
}

export interface Objeto {
  codObjeto: number;
  desObjeto: string;
  nomPagina: string;
  flgAcesso: string;
}
