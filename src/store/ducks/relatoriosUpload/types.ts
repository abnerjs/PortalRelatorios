import { InfoPaginacao, TipoFiltro } from "../base/types";
import { TipoArquivo } from "../tipoArquivo/types";

export interface ArquivosState {
  data?: Array<ArquivoUpload>;
  filterList: Array<TipoFiltro>;
  pagination?: InfoPaginacao;
  error?: string;
}

export interface ArquivoUpload {
  idRelTpArquivo: TipoArquivo | null;
  lstCodFornecedores?: Array<number>;
  lstCodPrestadores?: Array<number>;
  desObs?: string;
  codAno?: number;
  codMes?: number;
  dtaIni?: string;
  dtaFim?: string;
  nomArquivo: string;
  forcarUpload?: boolean;
  formFile: File | null;
}
