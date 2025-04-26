import { combineReducers } from 'redux';
import { transactionsReducer } from './transactionsReducer';
import { categoriesReducer } from './categoriesReducer';

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  categories: categoriesReducer,
});

export default rootReducer;