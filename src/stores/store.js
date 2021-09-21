import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from './saga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancers = [applyMiddleware(...middlewares)];
const composedEnhancers = composeWithDevTools(...enhancers);
const store = createStore(persistedReducer, composedEnhancers);
sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);
export { store, persistor, sagaMiddleware };
