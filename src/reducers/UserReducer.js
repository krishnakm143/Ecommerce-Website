import { USER_AUTH_REQUEST, USER_AUTH_SUCCESS, USER_AUTH_FAILURE } from './actions';

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case USER_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
