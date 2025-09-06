import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { ApiRequests } from "../../service/ApiRequests";
import {
  catchAsync,
  handleLoadingErrorParamsForAsycThunk,
  reduxToolKitCaseBuilder,
} from "../detectError";

export const addBookAsyncThunk = createAsyncThunk(
  "addBook/addBookAsyncThunk",
  catchAsync(async ({ data, callBack }) => {
    const response = await ApiRequests.addBook(data);
    if (callBack) callBack();
    return response?.data;
  })
);

export const getBooksAsyncThunk = createAsyncThunk(
  "addBook/getBooksAsyncThunk",
  catchAsync(async (params) => {
    const response = await ApiRequests.getBooks(params);
    return response?.data;
  })
);

export const deleteBookAsyncThunk = createAsyncThunk(
  "addBook/deleteBookAsyncThunk",
  catchAsync(async ({ id, callBack }) => {
    const response = await ApiRequests.deleteBook(id);
    if (callBack) callBack();
    return response?.data;
  })
);

export const updateBookAsyncThunk = createAsyncThunk(
  "addBook/updateBookAsyncThunk",
  catchAsync(async ({ id, data }) => {
    const response = await ApiRequests.updateBook(id, data);
    return response?.data;
  })
);

export const getBookAsyncThunk = createAsyncThunk(
  "addBook/getBookAsyncThunk",
  catchAsync(async (id) => {
    const response = await ApiRequests.getBook(id);
    return response?.data;
  })
);

const initialState = {
  books: {
    page: 1,
    results: [],
    totalPages: 1,
    totalResults: 1,
  },
  book: null,
  errors: {},
  loadings: {},
  errorMessages: {},
  errorCodes: {},
  paramsForThunk: {},
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooksAsyncThunk.fulfilled, (state, action) => {
        state.books = action.payload;
      })
      .addCase(getBookAsyncThunk.fulfilled, (state, action) => {
        state.book = action.payload;
      })
      .addMatcher(
        isAnyOf(
          ...reduxToolKitCaseBuilder([
            addBookAsyncThunk,
            getBooksAsyncThunk,
            deleteBookAsyncThunk,
            updateBookAsyncThunk,
            getBookAsyncThunk,
          ])
        ),
        handleLoadingErrorParamsForAsycThunk
      );
  },
});

export default bookSlice.reducer;
