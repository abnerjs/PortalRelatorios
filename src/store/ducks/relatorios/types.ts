export interface RelatoriosState {
  data?: string;
  error?: string;
  loading: boolean;
  operationError?: string;
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
