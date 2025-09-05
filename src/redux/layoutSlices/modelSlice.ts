// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modelState: {
    addBookModal: false,
  },
  modelArgs: {
    addBookModal: {},
  },
  errorCode: null,
  models: {},
};

export const handleLayoutSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    handleModel: (state, action) => {
      state.modelState = {
        ...state.modelState,
        [action.payload.model]: action.payload.state,
      };
      state.modelArgs = {
        ...state.modelArgs,
        [action.payload.model]: action.payload.args,
      };
    },
  },
});

export const { handleModel } = handleLayoutSlice.actions;

export default handleLayoutSlice.reducer;
