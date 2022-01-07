import { InfoPaginacao, TipoFiltro } from '../base/types';
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
  fileRequestState?: string;
  fileRequestError?: ErrorAPI;
}

interface ArquivoBase {
  idRelTpArquivo: number;
  lstCodFornecedores?: Array<number>;
  lstCodPrestadores?: Array<number>;
  desObs?: string;
  codAno?: number;
  codMes?: number;
  dtaIni?: string;
  dtaFim?: string;
  nomArquivo: string;
}

export interface ArquivoUpload extends ArquivoBase {
  substituirExistentes?: boolean;
  formFile: File;
}

export interface ArquivoUploadReceiveFormat extends ArquivoUpload {
  dtaUpload: string;
  idRelArquivo: number;
  desNomeUsuarioUpload: string;
}

export interface ArquivoUpdate extends ArquivoBase {
  dtaUpload: string;
  idRelArquivo: number;
  formFile?: File;
}

export interface ArquivosByTipo {
  idRelTpArquivo: number;
  desTpArquivo: string;
  arquivos: Array<ArquivoUploadReceiveFormat>;
}
