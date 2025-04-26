import {
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
} from '../actions/transactionsActions';

const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

export const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS_REQUEST:
      return { ...state, loading: true };
    case FETCH_TRANSACTIONS_SUCCESS:
      return { ...state, loading: false, transactions: action.payload };
    case FETCH_TRANSACTIONS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};