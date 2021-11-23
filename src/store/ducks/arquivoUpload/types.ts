export interface ArquivoUploadState {
  data?: string;
  error?: string;
  loading: boolean;
  operationError?: string;
  operationState?: string;
}

export interface ArquivoUpload {
  idRelArquivo: number;
  idRelTpArquivo: number;
  codFornecedor?: number;
  codPrestador?: number;
  desObs?: string;
  codAno?: number;
  codMes?: number;
  dtaIni?: string;
  dtaFim?: string;
  nomArquivo: string;
  dtaUpload: string;
}
