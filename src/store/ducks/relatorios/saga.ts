import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from 'src/services/api';
import {
  relatoriosDownloadError,
  relatoriosDownloadRequest,
  relatoriosDownloadSuccess,
} from 'src/store/ducks/relatorios';

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
  action: ReturnType<typeof relatoriosDownloadRequest>
) {
  try {
    const query = action.payload.query ?? '';

    const response: AxiosResponse<Blob> = yield call(
      api.get,
      `${action.payload.url}${query}`,
      {
        responseType: 'blob',
      }
    );
    const fileName = getFileNameFromHeader(response.headers);
    const blobURL = URL.createObjectURL(response.data);

    downloadFile(response.data, fileName, 'pdf');

    yield put(relatoriosDownloadSuccess(blobURL));
  } catch (error: any) {
    yield put(relatoriosDownloadError(error));
  }
}

export default all([
  takeLatest(relatoriosDownloadRequest, sendDownloadRequest),
]);
