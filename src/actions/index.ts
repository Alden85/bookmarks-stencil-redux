import { LoadDataBeginAction, LoadDataSuccessAction, LoadDataFailureAction,PostDataSuccessAction,DeleteDataSuccessAction } from './data';

// Keep this type updated with each known action
export type ActionTypes = LoadDataBeginAction | LoadDataSuccessAction | LoadDataFailureAction | PostDataSuccessAction | DeleteDataSuccessAction;

export enum Actions {
  LOAD_DATA_BEGIN = 'LOAD_DATA_BEGIN',
  LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS',
  LOAD_DATA_FAILURE = 'LOAD_DATA_FAILURE',
  POST_DATA_SUCCESS = 'POST_DATA_SUCCESS',
  DELETE_DATA_SUCCESS= 'DELETE_DATA_SUCCESS'
}
