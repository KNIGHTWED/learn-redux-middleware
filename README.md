# 미들웨어

리덕스 미들웨어는 액션을 디스패치 했을 때 리듀서에서 이를 처리하기에 앞서 사전에 지정된 작업들을 실행한다.

미들웨어는 액션과 리듀서 사이의 중간자라고 할 수 있다.

## 미들웨어 만들기


## logger


## 비동기 작업 관련 미들웨어

redux-thunk: 가장 많이 사용하는 비동기 작업 관련 미들웨어, 객체가 아닌 함수 형태의 액션을 디스패치 할 수 있다.

redux-saga: redux-thunk 다음으로 가장 많이 사용되는 비동기 작업 관련 미들웨어 라이브러리

### redux-thunk

thunk란..
특정 작업을 나중에 할 수 있도록 미루기 위해 함수 형태로 감싼 것을 의미한다.





---

useEffect 사용하는 방법 2가지
1. import 하기

```javascript
import { useEffect } from 'react';

useEffect(() => { ... }, [...]);
```


2. useEffect 함수 선언하기

```javascript
const { useEffect } = React;

useEffect(() => { ... }, [...]);
```


### redux-saga

