# 미들웨어

리덕스 미들웨어는 액션을 디스패치 했을 때 리듀서에서 이를 처리하기에 앞서 사전에 지정된 작업들을 실행한다.

미들웨어는 액션과 리듀서 사이의 중간자라고 할 수 있다.

## 미들웨어 만들기(loggerMiddleware.js)

```javascript
const loggerMiddleware = store => next => action => {
  // 미들웨어 기본 구조
};

// lib/loggerMiddleware.js 에서 위의 화살표 함수를 function 키워드로 풀어 쓴 함수
const loggerMiddleware = function loggerMiddleware(store) {
  return function(next) {
    return function(action){

    };
  };
};
```
함수에서 파라미터로 받아오는 store는 리덕스 스토어의 인스턴스를, 

action은 디스패치된 액션을 가리킨다.

next 파라미터는 함수 형태이며, store.dispatch와 비슷한 역할이다.

next(action)을 호출할 때 다음 미들웨어가 있다면 미들웨어에게 액션을 넘겨주고,

다음 미들웨어가 없다면 리듀서에게 액션을 넘겨준다.

[lib/loggerMiddleware.js](https://github.com/KNIGHTWED/learn-redux-middleware/blob/main/src/lib/loggerMiddleware.js)

**`console.group()`**
console.log들을 하나의 그룹으로 묶어서 출력하고 싶을 때 사용
`console.groupEnd()` 로 닫아줘야 한다.

```javascript
import loggerMiddleware from './lib/loggerMiddleware';

const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));
```

미들웨어에서 여러 종류의 작업을 처리할 수 있다.

특정 조건에 따라 액션을 무시하게 만들 수도 있고,

액션 정보를 가로채서 수정할 수도 있고,

특정 액션에 기반하여 새로운 액션을 여러 번 디스패치할 수도 있다.

미들웨어의 속성을 이용하면 네트워크 요청과 같은 비동기 작업을 관리하기 유용합니다.

## redux-logger

전에 만든 logerMiddleware 보다 더 잘 만들어진 라이브러리이다.

```
$ yarn add redux-logger
```

```javascript
// src/index.js
import { createLogger } from 'redux-logger';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger));
```


## 비동기 작업 관련 미들웨어

**redux-thunk**: 가장 많이 사용하는 비동기 작업 관련 미들웨어, 객체가 아닌 함수 형태의 액션을 디스패치 할 수 있다.

**redux-saga**: redux-thunk 다음으로 가장 많이 사용되는 비동기 작업 관련 미들웨어 라이브러리

### redux-thunk

thunk란..
특정 작업을 나중에 할 수 있도록 미루기 위해 함수 형태로 감싼 것을 의미한다.

```
$ yarn add redux-thuck
```

```javascript
// src/index.js
import ReduxThunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(logger, ReduxThunk));
```

#### 웹 요청 비동기 처리하기

API 함수화

[lib/api.js](https://github.com/KNIGHTWED/learn-redux-middleware/blob/main/src/lib/api.js)



리듀서 만들기

[module/sample.js](https://github.com/KNIGHTWED/learn-redux-middleware/blob/main/src/modules/sample.js)



리듀서 포함시키기
[module/index.js](https://github.com/KNIGHTWED/learn-redux-middleware/blob/main/src/modules/index.js)



Sample 컴포넌트
[components/Sample.js](https://github.com/KNIGHTWED/learn-redux-middleware/blob/main/src/components/Sample.js)

데이터를 불러와서 렌더링할 때 **유효성 검사**를 해주는 것이 중요하다.

만약 데이터가 없는 상태라면 자바스크립트 오류가 발생한다.



Sample 컨테이너 컴포넌트
[containers/SampleContainer.js](https://github.com/KNIGHTWED/learn-redux-middleware/blob/main/src/containers/SampleContainer.js)


API를 요청할 때마다 thunk 함수를 작성하는 것과 로딩 상태를 리듀서에서 관리하는 작업의 코드는 길다.

반복되는 로직은 따로 분리하여 코드의 양을 줄이면 좋다.

[lib/createRequestThunk.js](https://github.com/KNIGHTWED/learn-redux-middleware/blob/main/src/lib/createRequestThunk.js)


이렇게 하면 `module/sample.js` 에 있던 thunk 함수의 코드를 줄일 수 있다.

lib/createRequestThunk.js 에 import 해준 startLoading과 finishLoading도 module/loading.js 로 간소화 할 수 있다.


### redux-saga


---

### useEffect 사용하는 방법 2가지
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




