import { configureStore } from "@reduxjs/toolkit"; // Ensure this import is correct
import { combineReducers } from "redux"; // Add this import
import authReducer from "@/redux/authSlice"; // Add this import
import { thunk } from "redux-thunk"; // Correct import for redux-thunk

const rootReducer = combineReducers({
  auth: authReducer, // Add auth reducer
  // Add other reducers here
  // exampleReducer: exampleReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(thunk), // Ensure thunk is used as a function
});

export default store;
