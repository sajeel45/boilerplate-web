// ** Reducers Imports
import brand from "./pagesSlices/brandSlice";
import job from "./pagesSlices/jobSlice";
import error from "./errors/handleErrorsAndPayloads";
import auth from "./pagesSlices/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import model from "./layoutSlices/modelSlice"

const rootReducer = combineReducers({  
  model,
  auth,
  brand,
  job,
  error,
});

export default rootReducer;
