import axios from 'axios';

export const FETCH_TRANSACTIONS_REQUEST = 'FETCH_TRANSACTIONS_REQUEST';
export const FETCH_TRANSACTIONS_SUCCESS = 'FETCH_TRANSACTIONS_SUCCESS';
export const FETCH_TRANSACTIONS_FAILURE = 'FETCH_TRANSACTIONS_FAILURE';

export const fetchTransactions = (token) => async (dispatch) => {
  dispatch({ type: FETCH_TRANSACTIONS_REQUEST });
  
  try {
    const response = await axios.get('https://money-guard-backend-lnfk.onrender.com/api/transactions', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: FETCH_TRANSACTIONS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TRANSACTIONS_FAILURE,
      error: error.message,
    });
  }
};