import { Actions } from '../actions/index';


interface DataResponse {
  bookmarks:any;
}

interface DataPost {
  id:any,
  name:string,
  link:string,
  tags:any
}

interface DataDelete{
  id:any;
}

export function loadData() {
  return async dispatch => {
    // Trigger the LOAD_DATA_BEGIN action
    dispatch(loadDataBegin());

    try {
      let response = await fetch("http://localhost:3000/bookmarks");
      
      handleErrors(response);

      let json: DataResponse = await response.json();
      

      // Trigger the LOAD_DATA_SUCCESS action
      dispatch(loadDataSuccess(json));
      return json.bookmarks;
    } catch (error) {
      // Trigger the LOAD_DATA_FAILURE action
      dispatch(loadDataFailure(error));
    }
  };
}

//deleting bookmark from db
export function deleteData(id:DataDelete) {
  return async dispatch => {
    const url = `http://localhost:3000/bookmarks/${id}`;
  
    // request options
    const options = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
}
    try {
      let response = await fetch(url,options);

      handleErrors(response);

      let json:DataDelete  = await response.json();
      
      // Trigger the POST_DATA_SUCCESS action
      dispatch(deleteDataSuccess(json));
      
      return json;
      
    } catch (error) {
      // Trigger the LOAD_DATA_FAILURE action
      dispatch(loadDataFailure(error));
    }
  };
}

//Posting bookmarks to db
export function postData(bookmarkObj:DataPost) {
  return async dispatch => {
    const url = 'http://localhost:3000/bookmarks';
  
    // request options
    const options = {
    method: 'POST',
    body: JSON.stringify(bookmarkObj),
    headers: {
        'Content-Type': 'application/json'
    }
}
    try {
      let response = await fetch(url,options);
      
      handleErrors(response);

      let json:DataPost  = await response.json();
      
      // Trigger the POST_DATA_SUCCESS action
      dispatch(postDataSuccess(json));
      
      return json;
      
    } catch (error) {
      // Trigger the LOAD_DATA_FAILURE action
      dispatch(loadDataFailure(error));
    }
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

// ACTIONS

export interface LoadDataBeginAction {
  type: Actions.LOAD_DATA_BEGIN;
}

export const loadDataBegin = () => async (dispatch, _getState) => {
  return dispatch({
    type: Actions.LOAD_DATA_BEGIN,
  });
};

export interface LoadDataSuccessAction {
  type: Actions.LOAD_DATA_SUCCESS;
  payload: any;
}

export const loadDataSuccess = data => async (dispatch, _getState) => {
  return dispatch({
    type: Actions.LOAD_DATA_SUCCESS,
    payload: { data },
  });
};

export interface LoadDataFailureAction {
  type: Actions.LOAD_DATA_FAILURE;
  payload: any;
}

export const loadDataFailure = error => async (dispatch, _getState) => {
  return dispatch({
    type: Actions.LOAD_DATA_FAILURE,
    payload: { error },
  });
};

export interface PostDataSuccessAction{
  type:Actions.POST_DATA_SUCCESS;
  payload:any;
}

export const postDataSuccess = data => async (dispatch, _getState) => {
  return dispatch({
    type: Actions.POST_DATA_SUCCESS,
    payload: { data },
  });
};

export interface DeleteDataSuccessAction{
  type:Actions.DELETE_DATA_SUCCESS;
  payload:any;
}

export const deleteDataSuccess = data => async (dispatch, _getState) => {
  return dispatch({
    type: Actions.DELETE_DATA_SUCCESS,
    payload: { data },
  });
};
