import axios from 'axios';

export const FETCH_CONDITIONS = 'fetch_conditions';

export function fetchCondition(condition) {
  console.log('fetchCondition: ', condition)
  return function(dispatch) {
    axios.post('/condition', { condition })
      .then(resp => {
        dispatch({
          type: FETCH_CONDITIONS,
          payload: resp.data
        })
      })
      .catch(err => {
        console.log('fetch condition error: ', err);
      })
  }
}