import { InfoPaginacao, TipoFiltro } from 'src/store/ducks/base/types';

export interface UsuariosState {
  data: Array<Usuario>;
  filterList: Array<TipoFiltro>;
  pagination?: InfoPaginacao;
  loading: boolean;
  error?: string;
  operationLoading: boolean;
  operationError?: string;
  operationSuccess: boolean;
  deleteError?: string;
  deleteLoading: boolean;
  deleteSuccess: boolean;
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
