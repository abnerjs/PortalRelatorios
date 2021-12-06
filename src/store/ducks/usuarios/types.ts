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
