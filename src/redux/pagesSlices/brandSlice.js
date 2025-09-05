import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { ApiRequests } from "../../service/ApiRequests";
import {
  catchAsync,
  detectError,
  handleLoadingErrorParamsForAsycThunk,
  reduxToolKitCaseBuilder,
} from "../detectError";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
const toast = { error: () => {}, success: () => {} };
// Start Brand Slices
///////////////////////////////////////////////////

export const getBrandsAsyncThunk = createAsyncThunk(
  "brand/getBrandsAsyncThunk",
  catchAsync(async (params, _) => {
    const response = await ApiRequests.getBrands(params);
    return response?.data;
  })
);

export const deleteBrandAsyncThunk = createAsyncThunk(
  "brand/deleteBrandAsyncThunk",
  catchAsync(async (id, { dispatch, getState }) => {
    // const response = await ApiRequests.getAssets(filterparams);
    const response = await ApiRequests.deleteBrand(id);
    if (response.status == 204) {
      toast.success("Brand Deleted Successfully!");
      let params = {};
      let state = getState().listings;
      if (state.search) params.name = state.search;
      if (state.order) params.sortBy = `name:${state.order}`;
    } else {
      toast.error(response.error);
    }
    return id;
  })
);

export const getBrandAsyncThunk = createAsyncThunk(
  "brand/getBrandAsyncThunk",
  catchAsync(async (id, _) => {
    const response = await ApiRequests.getBrand(id);
    return response?.data;
  })
);  

export const getBrandRecentJobs = createAsyncThunk(
  "brand/getBrandRecentJobsAsyncThunk",
  catchAsync(async (id, _) => {
    const response = await ApiRequests.getRecentJobs(id);
    return response?.data;
  })
);

///////////////////////////////////////////////////

const initialState = {
  //news states
  brands: {
    page: 1,
    brands: [],
    totalPages: 1,
  },
  recentJobs : null,
  brandsAnalytics: {
    approved: 0,
    applied: 0,
    interested: 0,
    pass: 0,
    applications: 0,
    jobs: 0,
  },
  brandsCount: {
    page: 1,
    results: [],
    totalPages: 1,
  },
  inviteBrand: {
    page: 1,
    results: [],
    totalPages: 1,
  },
  brandExport: {
    page: 1,
    results: [],
    totalPages: 1,
  },
  brandRole: {
    page: 1,
    results: [],
    totalPages: 1,
  },
  brandsList: {
    page: 1,
    results: [],
    totalPages: 1,
  },
  brand: null,
  assets: null,
  asset: null,
  listings: {
    page: 1,
    results: [],
    totalPages: 1,
  },
  // manager states
  errors: {},
  loadings: {},
  errorMessages: {},
  errorCodes: {},
  paramsForThunk: {},
  search: null,
  categoryId: null,
  categories: [],
  order: "asce",
};

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.search = action.payload;
    },
    setCategoryValue(state, action) {
      state.categoryId = action.payload;
    },
    setOrderValue(state, action) {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //
      .addCase(getBrandsAsyncThunk.pending, (state, action) => {
        if (action.meta?.arg?.page <= 1 || !action.meta?.arg?.page) {
          state.brands = {
            page: 1,
            results: [],
            totalPages: 1,
          };
        }
      })
      .addCase(getBrandsAsyncThunk.fulfilled, (state, action) => {
        if (action.payload?.page > 1) {
          state.brands = {
            ...action.payload,
            brands: state?.brands?.results.concat(action?.payload?.results),
          };
        } else {
          state.brands = action.payload;
        }
      })
      .addCase(deleteBrandAsyncThunk.fulfilled, (state, action) => {
        state.brands = {
          ...state.brands,
          totalResults: state.brands?.totalResults - 1,
          results: state.brands?.results.filter((e) => e.id != action.payload),
        };
        state.brandsCount = {
          ...state.brandsCount,
          totalResults: state.brandsCount?.totalResults - 1,
          results: state.brandsCount?.results.filter(
            (e) => e.id != action.payload
          ),
        };
      })
      .addCase(getBrandAsyncThunk.fulfilled, (state, action) => {
        state.brand = action.payload;
      })
      .addCase(getBrandRecentJobs.fulfilled, (state, action) => {
        state.recentJobs = action.payload;
      })
      .addCase(getBrandRecentJobs.rejected, (state, action) => {
        state.recentJobs = null;
      })
      

      // im using addMatcher to manage the asyncthunksMehtod actions like fullfilled,pending,rejected and also to manage the errors loading and error messages and async params
      .addMatcher(
        // isAsyncThunk will run when the action is an asyncthunk exists from giver asycntthunks
        isAnyOf(
          // reduxToolKitCaseBuilder helper make fullfilled, pending, and rejected cases
          ...reduxToolKitCaseBuilder([
            getBrandsAsyncThunk,
            deleteBrandAsyncThunk,
            getBrandAsyncThunk,
            getBrandRecentJobs])
        ),
        handleLoadingErrorParamsForAsycThunk
      );
  },
});

export default brandSlice.reducer;
export const { setLoading, setSearchValue, setCategoryValue, setOrderValue } =
  brandSlice.actions;
