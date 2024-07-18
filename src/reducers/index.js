import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Adjust the path if necessary

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

export default rootReducer;
