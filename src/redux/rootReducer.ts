import { combineReducers } from "@reduxjs/toolkit";
import brand from "./pagesSlices/brandSlice";
import job from "./pagesSlices/jobSlice";
import error from "./errors/handleErrorsAndPayloads";
import model from "./layoutSlices/modelSlice";

const rootReducer = combineReducers({
  model,
  brand,
  job,
  error,
});

export default rootReducer;
