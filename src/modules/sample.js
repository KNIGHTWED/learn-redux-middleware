import { createAction, handleActions } from "redux-actions";
import * as api from '../lib/api';
import createRequestThunk from "../lib/createRequestThunk";
import { call, put, takeLatest} from 'redux-saga/effects';
import { startLoading, finishLoading } from "./loading";
import createRequestSaga from "../lib/createRequestSaga";


// 액션 타입 선언
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';


// thunk 함수 생성
// export const getPost = id => async dispatch => {
//   dispatch({ type: GET_POST });
//   try {
//     const response = await api.getPost(id);
//     // 요청 성공
//     dispatch({
//       type: GET_POST_SUCCESS,
//       payload: response.data
//     });
//   } catch (e) {
//     // 요청 실패
//     dispatch({
//       type: GET_POST_FAILURE,
//       payload: e,
//       error: true
//     });
//     throw e; // 나중에 컴포넌트단에서 에러를 조회할 수 있게 해 줌
//   }
// };

// export const getUsers = () => async dispatch => {
//   dispatch({ type: GET_USERS });
//   try {
//     const response = await api.getUsers();
//     dispatch({
//       type: GET_USERS_SUCCESS,
//       payload: response.data
//     });
//   } catch (e) {
//     dispatch({
//       type: GET_USERS_FAILURE,
//       payload: e,
//       error: true
//     });
//     throw e;
//   }
// };

// 짧은 thunk 함수 생성 (리팩토링, 모듈화?)
// export const getPost = createRequestThunk(GET_POST, api.getPost);
// export const getUsers = createRequestThunk(GET_USERS, api.getUsers);


// redux-saga
export const getPost = createAction(GET_POST, id => id);
export const getUsers = createAction(GET_USERS);

// function* getPostSaga(action) {
//   console.log('getPostSaga');
//   yield put(startLoading(GET_POST)); // 로딩 시작
//   try {
//     const post = yield call(api.getPost, action.payload);
//     yield put({
//       type: GET_POST_SUCCESS,
//       payload: post.data
//     });
//   } catch (e) {
//     yield put({
//       type: GET_POST_FAILURE,
//       payload: e,
//       error: true
//     });
//   }
//   yield put(finishLoading(GET_POST));
// }

// function* getUsersSaga() {
//   console.log('getUsersSaga');
//   yield put(startLoading(GET_USERS)); // 로딩 시작
//   try {
//     const users = yield call(api.getUsers);
//     yield put({
//       type: GET_USERS_SUCCESS,
//       payload: users.data
//     });
//   } catch (e) {
//     yield put({
//       type: GET_USERS_FAILURE,
//       payload: e,
//       error: true
//     });
//   }
//   yield put(finishLoading(GET_USERS));
// }

// 짧게 구현한 Saga
const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

export function* sampleSaga() {
  console.log('sampleSaga');
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}


// 초기 상태 선언
const initialState = {
  // redux-thunk
  // loading: {
  //   GET_POST: false,
  //   GET_USERS: false
  // },
  post: null,
  users: null
};

// redux-thunk 에는 POST, POST_SUCCESS, POST_FAILURE 가 전부 필요하다.
const sample = handleActions(
  {
    // [GET_POST]: state => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_POST: true // 요청 시작
    //   }
    // }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      // loading: {
      //   ...state.loading,
      //   GET_POST: false // 요청 완료
      // },
      post: action.payload
    }),
    // [GET_POST_FAILURE]: (state, action) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_POST: false // 요청 완료
    //   }
    // }),
    // [GET_USERS]: state => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_USERS: true // 요청 시작
    //   }
    // }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      // loading: {
      //   ...state.loading,
      //   GET_USERS: false // 요청 완료
      // },
      users: action.payload
    }),
  //   [GET_USERS_FAILURE]: (state, action) => ({
  //     ...state,
  //     loading: {
  //       ...state.loading,
  //       GET_USERS: false // 요청 완료
  //     }
  //   })
  },
  initialState
);

export default sample;