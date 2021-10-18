import { all } from 'redux-saga/effects';

import loginSaga from 'src/store/ducks/login/saga';

export default function* rootSaga(): any {
  return yield all([loginSaga]);
}
