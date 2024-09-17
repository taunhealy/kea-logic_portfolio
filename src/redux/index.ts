import { combineReducers } from "redux";
import authReducer from "./authSlice"; // Import your auth slice

const rootReducer = combineReducers({
  auth: authReducer, // Combine your reducers here
  // Add other reducers as needed
});

export default rootReducer;
