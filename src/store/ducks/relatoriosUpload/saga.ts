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
  arquivosDeleteRequest,
  arquivosDeleteSuccess,
  arquivosDeleteError,
  returnFileRequest,
  returnFileSuccess,
  returnFileError,
} from 'src/store/ducks/relatoriosUpload';
import { RespostaApi } from '../base/types';
import { ArquivosByTipo } from './types';

export function* sendGetRequest(action: ReturnType<typeof arquivosGetRequest>) {
  try {
    let query = '';
    if (action.payload) {
      query = '?';
      if (
        action.payload.periodoRef &&
        action.payload.periodoRef[0] &&
        action.payload.periodoRef[1]
      ) {
        query += `dtaIni=${
          action.payload.periodoRef[0].toISOString().split('T')[0]
        }&`;
        query += `dtaFim=${
          action.payload.periodoRef[1].toISOString().split('T')[0]
        }`;
      } else if (action.payload.periodoRef && action.payload.periodoRef[0]) {
        query += `dtaIni=${
          action.payload.periodoRef[0].toISOString().split('T')[0]
        }`;
      } else if (action.payload.periodoRef && action.payload.periodoRef[1]) {
        query += `dtaFim=${
          action.payload.periodoRef[1].toISOString().split('T')[0]
        }`;
      }

      if (
        action.payload.periodoUp &&
        action.payload.periodoUp[0] &&
        action.payload.periodoUp[1]
      ) {
        if (query !== '?') query += '&';
        query += `dtaUploadIni=${
          action.payload.periodoUp[0].toISOString().split('T')[0]
        }&`;
        query += `dtaUploadFim=${
          action.payload.periodoUp[1].toISOString().split('T')[0]
        }`;
      } else if (action.payload.periodoUp && action.payload.periodoUp[0]) {
        if (query !== '?') query += '&';
        query += `dtaIni=${
          action.payload.periodoUp[0].toISOString().split('T')[0]
        }`;
      } else if (action.payload.periodoUp && action.payload.periodoUp[1]) {
        if (query !== '?') query += '&';
        query += `dtaFim=${
          action.payload.periodoUp[1].toISOString().split('T')[0]
        }`;
      }

      if (action.payload.prestadores) {
        if (query !== '?') query += '&';
        query += `lstCodPrestadores=`;

        action.payload.prestadores.forEach((item, index) => {
          query += item.codigo;
          if (index !== (action.payload?.prestadores?.length || 0) - 1)
            query += ',';
        });
      }

      if (action.payload.fornecedores) {
        if (query !== '?') query += '&';
        query += `lstCodFornecedores=`;

        action.payload.fornecedores.forEach((item, index) => {
          query += item.codigo;
          if (index !== (action.payload?.fornecedores?.length || 0) - 1)
            query += ',';
        });
      }

      if (action.payload.descricao) {
        if (query !== '?') query += '&';
        query += `filtroPadrao=${action.payload.descricao}`;
      }
    }

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

export function* sendReturnFileRequest(
  action: ReturnType<typeof returnFileRequest>
) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<Blob> = yield call(
      api.get,
      `Relatorios/v1/download/?idRelArquivo=${query}`,
      {
        responseType: 'blob',
      }
    );
    const blob = new Blob([response.data])

    const fileName = getFileNameFromHeader(response.headers);

    var file = new File([blob], fileName + '.pdf' || 'file.pdf');

    yield put(returnFileSuccess(file));
  } catch (error: any) {
    yield put(returnFileError(error));
  }
}

export function* sendDownloadRequest(
  action: ReturnType<typeof arquivosDownloadRequest>
) {
  try {
    const query = action.payload ?? '';

    const response: AxiosResponse<Blob> = yield call(
      api.get,
      `Relatorios/v1/download/?idRelArquivo=${query}`,
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
  formData.append('idRelTpArquivo', action.payload.idRelTpArquivo.toString());

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
  if (action.payload.substituirExistentes)
    formData.append(
      'substituirExistentes',
      action.payload.substituirExistentes.toString()
    );

  try {
    yield call(api.post, `Relatorios/v1/`, formData);
    yield put(arquivosUploadSuccess());
  } catch (error: any) {
    yield put(arquivosUploadError(error));
  }
}

export function* sendDeleteRequest(
  action: ReturnType<typeof arquivosDeleteRequest>
) {
  try {
    const query = `?idRelArquivo=${action.payload.idRelArquivo}`;

    yield call(api.delete, `Relatorios/v1/${query}`);
    yield put(arquivosDeleteSuccess());
  } catch (error: any) {
    yield put(arquivosDeleteError(error));
  }
}

export default all([
  takeLatest(arquivosDownloadRequest, sendDownloadRequest),
  takeLatest(arquivosUploadRequest, sendUploadRequest),
  takeLatest(arquivosGetRequest, sendGetRequest),
  takeLatest(arquivosDeleteRequest, sendDeleteRequest),
  takeLatest(returnFileRequest, sendReturnFileRequest),
]);
