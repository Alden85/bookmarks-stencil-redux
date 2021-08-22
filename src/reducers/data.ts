import { Actions, ActionTypes } from '../actions/index';

interface DataState {
  bookmarks: any;
  loading: boolean;
  error: any;
  deletedId: any;
}

const getInitialState = () => {
  return {
    bookmarks: [],
    loading: false,
    error: null,
    deletedId:null
  };
};

const dataReducer = (state: DataState = getInitialState(), action: ActionTypes) => {
  switch (action.type) {
    case Actions.LOAD_DATA_BEGIN: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case Actions.LOAD_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        bookmarks: action.payload.data,
      };
    }

    case Actions.LOAD_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }

    case Actions.POST_DATA_SUCCESS: {
      return {
        ...state,
        bookmarks:action.payload.data,
        error: action.payload.error,
      };
    }

      case Actions.POST_DATA_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case Actions.DELETE_DATA_SUCCESS: {
      return {
        ...state,
        deletedId:action.payload.data,
        bookmarks:action.payload.data.bmsFiltered,
        error: action.payload.error,
      };
    }

      case Actions.DELETE_DATA_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    default:
      return state;
  }
};

export default dataReducer;
