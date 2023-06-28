
import { combineReducers } from 'redux';
 
import counterReducer from './counterReducer '; // Import your reducer(s) here

const rootReducer = combineReducers({
  counter: counterReducer, // Add your reducer(s) here
});

export default rootReducer;