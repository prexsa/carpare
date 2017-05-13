import axios from 'axios';

export const FETCH_CONDITIONS = 'fetch_conditions';
export const FETCH_CAR = 'fetch_car';

export function fetchCondition(condition) {
  // console.log('fetchCondition: ', condition)
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

export function fetchCar( state ,year) {
  const modelMakeYear = {
    condition: state.condition,
    makeNiceName: state.makeNiceName,
    modelNiceName: state.modelNiceName,
    year: year
  }

  return function(dispatch) {
    axios.post('/modelDetails', { modelMakeYear })
      .then(resp => {
        //console.log('/modelDetails: ', resp.data)
        dispatch({
          type: FETCH_CAR,
          payload: resp.data
        })
      })
      .catch(err => {
        console.log('fetch car error: ', err);
      })
  }
}