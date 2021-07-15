import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, { rootSaga } from './modules';

const sagaMiddleware = createSagaMiddleware(); // 사가 미들웨어를 만듭니다.

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga); // 루트 사가 실행

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
