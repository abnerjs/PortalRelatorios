import { InfoPaginacao, TipoFiltro } from "../base/types";
import { TipoArquivo } from "../tipoArquivo/types";

export interface ArquivosState {
  data?: Array<ArquivosByTipo>;
  filterList: Array<TipoFiltro>;
  pagination?: InfoPaginacao;
  error?: string;
  state?: string;
  downloadError?: string;
  uploadState?: string;
}

export interface ArquivoUpload {
  idRelTpArquivo: number;
  lstCodFornecedores?: Array<number>;
  lstCodPrestadores?: Array<number>;
  desObs?: string;
  codAno?: number;
  codMes?: number;
  dtaIni?: string;
  dtaFim?: string;
  nomArquivo: string;
  forcarUpload?: boolean;
  formFile: File;
}

interface ArquivoUploadReceiveFormat extends ArquivoUpload {
  dtaUpload: string;
}

export interface ArquivosByTipo {
  idRelTpArquivo: number;
  desTpArquivo: string;
  arquivos: Array<ArquivoUploadReceiveFormat>;
}
