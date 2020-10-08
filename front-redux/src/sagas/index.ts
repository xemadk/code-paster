import { all, fork } from 'redux-saga/effects';
import { socketRootSaga } from './socket';

export const rootSaga = function* root() {
  yield all([fork(socketRootSaga)]);
};