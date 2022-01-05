import { InfoPaginacao, TipoFiltro } from '../base/types';
import { TipoArquivo } from '../tipoArquivo/types';
import { ErrorAPI } from '../types';

export interface ArquivosState {
  data?: Array<ArquivosByTipo>;
  file?: any;
  filterList: Array<TipoFiltro>;
  pagination?: InfoPaginacao;
  error?: ErrorAPI;
  state?: string;
  downloadError?: ErrorAPI;
  uploadError?: ErrorAPI;
  uploadState?: string;
  deleteError?: ErrorAPI;
  deleteState?: string;
}

export interface ArquivoUpload {
  idRelTpArquivo: TipoArquivo;
  lstCodFornecedores?: Array<number>;
  lstCodPrestadores?: Array<number>;
  desObs?: string;
  codAno?: number;
  codMes?: number;
  dtaIni?: string;
  dtaFim?: string;
  nomArquivo: string;
  substituirExistentes?: boolean;
  formFile: File;
}

export interface ArquivoUploadReceiveFormat extends ArquivoUpload {
  dtaUpload: string;
  idRelArquivo: number;
  desNomeUsuarioUpload: string;
}

export interface ArquivosByTipo {
  idRelTpArquivo: number;
  desTpArquivo: string;
  arquivos: Array<ArquivoUploadReceiveFormat>;
}
