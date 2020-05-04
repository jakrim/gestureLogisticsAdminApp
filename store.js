import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './store/reducers/auth';
import ordersReducer from './store/reducers/orders';
import gRunnerReducer from './store/reducers/gRunner';
import paymentsReducer from './store/reducers/payments';

const rootReducer = combineReducers({
  auth: authReducer,
  orders: ordersReducer,
  gRunners: gRunnerReducer,
  payments: paymentsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
