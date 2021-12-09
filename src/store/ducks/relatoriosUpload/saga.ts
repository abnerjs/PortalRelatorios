import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from 'src/services/api';
import {
  arquivosGetError,
  arquivosGetRequest,
  arquivosGetSuccess,
  arquivosDownloadError,
  arquivosDownloadRequest,
  arquivosDownloadSuccess,
  arquivosUploadError,
  arquivosUploadRequest,
  arquivosUploadSuccess,
} from 'src/store/ducks/relatoriosUpload';
import { RespostaApi } from '../base/types';
import { ArquivosByTipo } from './types';

export function* sendGetRequest(action: ReturnType<typeof arquivosGetRequest>) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<RespostaApi<ArquivosByTipo>> = yield call(
      api.get,
      `Relatorios/v1/${query}`
    );

    yield put(arquivosGetSuccess(response.data));
  } catch (error: any) {
    yield put(arquivosGetError(error));
  }
}

function downloadFile(
  data: any,
  fileName: string | null,
  fileExtension: string
): void {
  const blob = new Blob([data]);

  const fileURL = global.window.URL.createObjectURL(blob);
  const fileLink = global.window.document.createElement('a');

  fileLink.setAttribute('href', fileURL);
  fileLink.setAttribute(
    'download',
    `${fileName ?? 'download'}.${fileExtension}`
  );

  global.window.document.body.appendChild(fileLink);

  fileLink.click();

  global.window.document.body.removeChild(fileLink);
}

function getFileNameFromHeader(responseHeaders: any): string | null {
  try {
    const fileNameheader = responseHeaders['content-disposition'] as string;
    const fileName = fileNameheader.split("''")[1];
    const index = fileName.lastIndexOf('.');

    return fileName.substring(0, index).replaceAll('%20', ' ');
  } catch {
    return null;
  }
}

export function* sendDownloadRequest(
  action: ReturnType<typeof arquivosDownloadRequest>
) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<Blob> = yield call(
      api.get,
      `Relatorios/v1/downloadRelatorio/?idRelArquivo=${query}`,
      {
        responseType: 'blob',
      }
    );
    const fileName = getFileNameFromHeader(response.headers);
    const blobURL = URL.createObjectURL(response.data);

    downloadFile(response.data, fileName, 'pdf');

    yield put(arquivosDownloadSuccess(blobURL));
  } catch (error: any) {
    yield put(arquivosDownloadError(error));
  }
}

export function* sendUploadRequest(
  action: ReturnType<typeof arquivosUploadRequest>
) {
  let formData = new FormData();
  formData.append('formFile', action.payload.formFile);
  formData.append('nomArquivo', action.payload.nomArquivo);
  formData.append(
    'idRelTpArquivo',
    action.payload.idRelTpArquivo.idRelTpArquivo.toString()
  );

  action.payload.lstCodFornecedores?.forEach((item, index) =>
    formData.append(`lstCodFornecedores[${index}]`, item.toString())
  );
  action.payload.lstCodPrestadores?.forEach((item, index) =>
    formData.append(`lstCodPrestadores[${index}]`, item.toString())
  );

  if (action.payload.dtaFim) formData.append('dtaFim', action.payload.dtaFim);
  if (action.payload.dtaIni) formData.append('dtaIni', action.payload.dtaIni);
  if (action.payload.codAno)
    formData.append('codAno', action.payload.codAno.toString());
  if (action.payload.codMes)
    formData.append('codMes', action.payload.codMes.toString());
  if (action.payload.desObs) formData.append('desObs', action.payload.desObs);
  formData.append('forcarUpload', 'true');

  try {
    yield call(api.post, `Relatorios/v1/uploadRelatorio/`, formData);
    yield put(arquivosUploadSuccess());
  } catch (error: any) {
    yield put(arquivosUploadError(error));
  }
}

export default all([
  takeLatest(arquivosDownloadRequest, sendDownloadRequest),
  takeLatest(arquivosUploadRequest, sendUploadRequest),
  takeLatest(arquivosGetRequest, sendGetRequest),
]);
