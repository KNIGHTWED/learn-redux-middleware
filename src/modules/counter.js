import { createAction, handleActions } from "redux-actions";
import { delay, put, takeEvery, takeLatest, select, throttle } from 'redux-saga/effects';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// redux-thunk
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

// redux-saga
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
  yield delay(1000);
  yield put(increase());
  const number=yield select(state => state.counter);
  console.log(`현재 값은 ${number} 입니다.`);
}
function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* counterSaga() {
  // takeEvery 는 들어오는 모든 액션에 대해 특정 작업을 처리
  // yield takeEvery(INCREASE_ASYNC, increaseSaga);
  // 3초 주기로 단 한번만
  yield throttle(3000, INCREASE_ASYNC, increaseSaga);
  // takeLatest 는 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
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