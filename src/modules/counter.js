import { createAction, handleActions } from "redux-actions";
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// redux-saga
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);


// export const increaseAsync = () => dispatch => {
//   setTimeout(() => {
//     dispatch(increase());
//   }, 1000);
// };
// export const decreaseAsync = () => dispatch => {
//   setTimeout(() => {
//     dispatch(decrease());
//   }, 1000);
// };

function* increaseSaga() {
  yield delay(1000);
  yield put(increase());
}
function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  yield takeLatest(INCREASE_ASYNC, decreaseSaga);
}


const initialState = 0; // 꼭 객체일 필요는 없다. 숫자도 작동한다.

const counter = handleActions(
  {
    [INCREASE]: state => state + 1,
    [DECREASE]: state => state -1
  },
  initialState
);

export default counter;