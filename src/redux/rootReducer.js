// ** Reducers Imports
import brand from "./pagesSlices/brandSlice";
import job from "./pagesSlices/jobSlice";
import error from "./errors/handleErrorsAndPayloads";
import auth from "./pagesSlices/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import model from "./layoutSlices/modelSlice"
import books from "./pagesSlices/bookSlice"

const rootReducer = combineReducers({  
  model,
  auth,
  brand,
  books,
  job,
  error,
});

export default rootReducer;
