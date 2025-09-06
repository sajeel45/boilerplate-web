import { combineReducers } from "@reduxjs/toolkit";
import brand from "./pagesSlices/brandSlice";
import job from "./pagesSlices/jobSlice";
import error from "./errors/handleErrorsAndPayloads";
import model from "./layoutSlices/modelSlice";
import books from './pagesSlices/bookSlice'

const rootReducer = combineReducers({
  model,
  brand,
  job,
  books,
  error,
});

export default rootReducer;
