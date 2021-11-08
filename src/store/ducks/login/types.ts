export interface SessionState {
  user: UserLogin | null;
  objetos: Array<Objeto>;
  authenticated: boolean;
  error?: string;
  loading: boolean;
}

export interface LoginRequest {
  desLogin: string;
  desSenha: string;
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
