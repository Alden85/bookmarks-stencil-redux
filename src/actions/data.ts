import { Actions} from '../actions/index';
import {ThunkAction} from 'redux-thunk'

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

//ACTION GENERATORS

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

      return json

    } catch (error) {
      // Trigger the LOAD_DATA_FAILURE action
      dispatch(loadDataFailure(error));
    }
  };
}

//deleting bookmark from db
export function deleteData(id:DataDelete,bms:any):ThunkAction<any,any,any, any> {
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
      //console.log(response)
      handleErrors(response);

      let resId  = await response.url
      let resIdsub = resId.substr(32,68)
      //console.log(resIdsub)

      let bmsFiltered = bms.filter(bm=>bm.id !==id)
      //triger deleteDataSuccess Action and send it payload to update state
      dispatch(deleteDataSuccess({resIdsub,bmsFiltered}));
      
      //triger delete data failure action
    } catch (error) {
      dispatch(deleteDataFailure(error));
    }
  };
}


//Posting bookmarks to db
export function postData(bookmarkObj:DataPost,bookmarksList:any) {
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
      //console.log(response)
      handleErrors(response);

      let json:DataPost  = await response.json();
      //console.log(json)
      let bookmarksAdded = [...bookmarksList,json]
   
      // Trigger the POST_DATA_SUCCESS action
      dispatch(postDataSuccess(bookmarksAdded));
      
      return json;
      
    } catch (error) {
      // Trigger the POST_DATA_FAILURE action
      dispatch(postDataFailure(error));
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

export interface PostDataFailureAction{
  type:Actions.POST_DATA_FAILURE;
  payload:any
}

export const postDataFailure = error => async (dispatch, _getState) => {
  return dispatch({
    type: Actions.POST_DATA_FAILURE,
    payload: { error },
  });
};

export interface DeleteDataSuccessAction{
  type:Actions.DELETE_DATA_SUCCESS;
  payload:any;
}

export const deleteDataSuccess = (data)=> async (dispatch, _getState) => {
  return dispatch({
    type: Actions.DELETE_DATA_SUCCESS,
    payload: { data },
  });
};

export interface DeleteDataFailureAction{
  type:Actions.DELETE_DATA_FAILURE;
  payload:any
}

export const deleteDataFailure = error => async (dispatch, _getState) => {
  return dispatch({
    type: Actions.DELETE_DATA_FAILURE,
    payload: { error },
  });
};
