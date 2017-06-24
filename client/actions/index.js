import axios from 'axios';

export const FETCH_CONDITIONS = 'fetch_conditions';
export const FETCH_CAR = 'fetch_car';
export const FETCH_SPECS = 'fetch_specs';
export const FETCH_EQUIPMENT = 'fetch_equipment';
export const FETCH_PHOTO = 'fetch_photo';
export const FETCH_SUGGESTIONS = 'fetch_suggestions';

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
       //  console.log('/modelDetails: ', resp.data)
        dispatch({
          type: FETCH_CAR,
          payload: resp.data
        })
      })
      .catch(err => {
        console.log('fetch model details error: ', err);
      })
  }
}

export function fetchSpecs(styleId) {
  // console.log('actions: ', styleId)
  return function(dispatch) {
    axios.post('/styleDetails', { styleId })
      .then(resp => {
         //console.log('/specs', resp.data)
        dispatch({
          type: FETCH_SPECS,
          payload: resp.data
        })
      })
      .catch(err => {
        console.log('fetch style details error: ', err);
      })
  }
}

export function fetchEquipment(styleId) {
  // console.log('actions: ', styleId)
  return function(dispatch) {
    axios.post('/equipmentDetails', { styleId })
      .then(resp => {
         // console.log('/equipment', resp.data.equipment)
        dispatch({
          type: FETCH_EQUIPMENT,
          payload: resp.data
        })
      })
      .catch(err => {
        console.log('fetch style details error: ', err);
      })
  }
}

export function fetchPhoto(styleId) {
  return function(dispatch) {
    axios.post('/photo', { styleId })
      .then(resp => {
        dispatch({
          type: FETCH_PHOTO,
          dispatch: resp.data
        })
      })
      .catch(err => {
        console.log('fetch photo error: ', err);
      })
  }
}

export function fetchSuggestions(vehicleClass) {
  //console.log('market: ', market)
  return function(dispatch) {
    axios.post('/suggestions', { vehicleClass })
      .then(resp => {
        dispatch({
          type: FETCH_SUGGESTIONS,
          payload: resp.data
        })
      })
      .catch(err => {
        console.log('fetch suggestions error: ', err);
      })
  }
}