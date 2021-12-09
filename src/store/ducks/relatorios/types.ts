import { ErrorAPI } from '../types';

export interface RelatoriosState {
  data?: string;
  error?: ErrorAPI;
  loading: boolean;
  operationError?: ErrorAPI;
  operationState?: string;
}

export interface Arquivo {
  idRelArquivo: number;
  idRelTparquivo: number;
  idRelUsuarioUpload: number;
  codFornecedor?: number;
  codPrestador?: number;
  desObs?: string;
  codAno?: number;
  codMes?: number;
  dtaInicio?: string;
  dtaFim?: string;
  dtaUpload: string;
}
