import axios from 'axios';

export const FETCH_CONDITIONS = 'fetch_conditions';
export const FETCH_CAR = 'fetch_car';
export const FETCH_STYLEID = 'fetch_styleId';
export const FETCH_EQUIPMENT = 'fetch_equipment';

export function fetchCondition(condition) {
  // console.log('fetchCondition: ', condition)
  return function(dispatch) {
    axios.post('/condition', { condition })
      .then(resp => {
        // console.log('resp: ', resp.data)
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

export function fetchCar(state, year) {
  // console.log('fetchCar ', state)
  const modelMakeYear = {
    condition: state.condition,
    makeNiceName: state.makeNiceName,
    modelNiceName: state.modelNiceName,
    year: year
  }
// console.log('modelMakeYear', modelMakeYear)
  return function(dispatch) {
    axios.post('/modelDetails', { modelMakeYear })
      .then(resp => {
        // console.log('/modelDetails: ', resp.data)
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

export function fetchEquipment(styleId) {
  // console.log('actions: ', styleId)
  return function(dispatch) {
    axios.post('/equipment', { styleId })
      .then(resp => {
         //console.log('/equipment', resp.data.equipment)
        dispatch({
          type: FETCH_EQUIPMENT,
          payload: resp.data
        })
      })
      .catch(err => {
        console.log('fetch equipment error: ', err);
      })
  }
}