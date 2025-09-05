import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { ApiRequests } from "../../service/ApiRequests";
import {
  catchAsync,
  detectError,
  handleLoadingErrorParamsForAsycThunk,
  reduxToolKitCaseBuilder,
} from "../detectError";
import { toast } from "react-toastify";
import { handleModel } from "../layoutSlices/modelSlice";

// Start Job Slices
///////////////////////////////////////////////////

export const getJobsAsyncThunk = createAsyncThunk(
  "job/getJobsAsyncThunk",
  catchAsync(async (params, _) => {
    const response = await ApiRequests.getJobs(params);
    return response?.data;
  })
);

export const getAvailableJobsByBrandAsyncThunk = createAsyncThunk(
  "job/getAvailableJobsByBrandAsyncThunk",
  catchAsync(async ({ id, params }, _) => {
    const response = await ApiRequests.getAvailableJobsByBrand(id, params);
    return response?.data;
  })
);

export const getMyJobsAsyncThunk = createAsyncThunk(
  "job/getMyJobsAsyncThunk",
  catchAsync(async (params, _) => {
    const response = await ApiRequests.getMyJobs(params);
    return response?.data;
  })
);
export const getMyJobsCountAsyncThunk = createAsyncThunk(
  "job/getMyJobsCountAsyncThunk",
  catchAsync(async (params, _) => {
    const response = await ApiRequests.getMyJobsCount(params);
    return response?.data;
  })
);

export const renewJobAsyncThunk = createAsyncThunk(
  "job/renewJobAsyncThunk",
  catchAsync(async ({ id, data, callBack }, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await ApiRequests.renewJob(id, data);
      if (callBack) callBack(response?.data);
      return response?.data;
    } catch (error) {
      // Optionally log or handle the error silently
      console.error("Job renew accept error:", error);
      return rejectWithValue({
        status: error.status,
        message: error?.response?.data?.message || "Something went wrong!",
      });
    }
  })
);

// export const getMyJobRelatedAsyncThunk = createAsyncThunk(
//   "job/getMyJobRelatedAsyncThunk",
//   catchAsync(async (params, _) => {
//     const response = await ApiRequests.getMyJobRelated(params);
//     return response?.data;
//   })
// );

export const getAvailableJobsAsyncThunk = createAsyncThunk(
  "job/getAvailableJobsAsyncThunk",
  catchAsync(async (params, _) => {
    const response = await ApiRequests.getAvailableJobs(params);
    return response?.data;
  })
);
export const getRecommendedJobsAsyncThunk = createAsyncThunk(
  "job/getRecommendedJobsAsyncThunk",
  catchAsync(async (params, _) => {
    const response = await ApiRequests.getRecommendedJobs(params);
    return response?.data;
  })
);

export const getJobDetailsAsyncThunk = createAsyncThunk(
  "job/getJobDetailsAsyncThunk",
  catchAsync(async (id, _) => {
    const response = await ApiRequests.getJobDetails(id);
    return response?.data;
  })
);
export const applyJobAsyncThunk = createAsyncThunk(
  "job/applyJobAsyncThunk",
  catchAsync(async ({ id, data, callBack = () => { } }, { dispatch, rejectWithValue }) => {
    try {
      const response = await ApiRequests.applyJob(id, data);
      if (response?.status === 202 && response?.data?.productIdConflict == true) {
        dispatch(
          handleModel({
            model: "infoModal",
            state: true,
            args: {
              description: <>
                Thanks for applying! Please note that you’re already hired on another job for this product ID. To proceed with any new job, you’ll need to complete the previous one first.
                <br />Once it’s marked complete, feel free to reapply or reach out to us for the next opportunity.
                <br />Thanks for your cooperation!
              </>
            },
          })
        );
        return
      }
      toast.success("Job Applied Successfully!");
      if (typeof callBack === "function") callBack(response?.data);
      return response?.data;
    } catch (error) {
      console.error("Job Application Error:", error);

      return rejectWithValue({
        status: error.status,
        message: error?.response?.data?.message || "Something went wrong!",
      });
    }
  })
);

export const verifyJobInvitationAsyncThunk = createAsyncThunk(
  "job/verifyJobInvitation",
  catchAsync(async (id, _) => {
    const response = await ApiRequests.verifyJobInvitation(id);
    return response?.data;
  })
);

///////////////////////////////////////////////////

const initialState = {
  //news states
  jobs: {
    page: 1,
    jobs: [],
    results: [],
    totalPages: 1,
  },
  jobsByBrand: {
    page: 1,
    jobs: [],
    totalPages: 1,
  },
  availableJobsByBrand: {
    page: 1,
    jobs: [],
    totalPages: 1,
  },
  myJobs: {
    page: 1,
    jobs: [],
    results: [],
    totalPages: 1,
  },
  myJobsRelated: {
    page: 1,
    jobs: [],
    results: [],
    totalPages: 1,
  },
  availableJobs: {
    page: 1,
    jobs: [],
    totalPages: 1,
  },
  recommendedJobs: {
    page: 1,
    jobs: [],
    totalPages: 1,
  },
  hiredJobs: {
    page: 1,
    jobs: [],
    totalPages: 1,
  },
  createJobs: {
    page: 1,
    jobs: [],
    totalPages: 1,
  },
  jobsCount: {},
  inviteJob: {
    page: 1,
    results: [],
    totalPages: 1,
  },
  jobExport: {
    page: 1,
    results: [],
    totalPages: 1,
  },
  jobRole: {
    page: 1,
    results: [],
    totalPages: 1,
  },
  jobsList: {
    page: 1,
    results: [],
    totalPages: 1,
  },
  job: null,
  appliedJob: null,
  jobDetails: {
    job: {},
    application: null,
  },
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

const jobSlice = createSlice({
  name: "jobs",
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

      .addCase(getJobsAsyncThunk.pending, (state, action) => {
        if (action.meta?.arg?.page <= 1 || !action.meta?.arg?.page) {
          state.jobs = {
            page: 1,
            results: [],
            totalPages: 1,
          };
        }
      })
      .addCase(getMyJobsCountAsyncThunk.fulfilled, (state, action) => {
        state.jobsCount = action.payload;
      })
      .addCase(getJobsAsyncThunk.fulfilled, (state, action) => {
        if (action.payload?.page > 1) {
          state.jobs = {
            ...action.payload,
            jobs: state?.jobs?.results.concat(action?.payload?.results),
          };
        } else {
          state.jobs = action.payload;
        }
      })
      .addCase(getAvailableJobsByBrandAsyncThunk.fulfilled, (state, action) => {
        if (action.payload?.page > 1) {
          state.availableJobsByBrand = {
            ...action.payload,
            results: state?.availableJobsByBrand?.results.concat(
              action?.payload?.results
            ),
          };
        } else {
          state.availableJobsByBrand = action.payload;
        }
      })
      .addCase(getMyJobsAsyncThunk.fulfilled, (state, action) => {
        if (action.payload?.page > 1) {
          state.myJobs = {
            ...action.payload,
            jobs: state?.myJobs?.results.concat(action?.payload?.results),
          };
        } else {
          state.myJobs = action.payload;
        }
      })
      // .addCase(getMyJobRelatedAsyncThunk.fulfilled, (state, action) => {
      //   state.myJobsRelated = action.payload;
      // })
      .addCase(getAvailableJobsAsyncThunk.fulfilled, (state, action) => {
        if (action.payload?.page > 1) {
          state.availableJobs = {
            ...action.payload,
            jobs: state?.availableJobs?.results.concat(
              action?.payload?.results
            ),
          };
        } else {
          state.availableJobs = action.payload;
        }
      })
      .addCase(getRecommendedJobsAsyncThunk.fulfilled, (state, action) => {
        state.recommendedJobs = action.payload;
      })
      .addCase(getJobDetailsAsyncThunk.pending, (state, action) => {
        state.jobDetails = {};
        state.appliedJob = {};
      })
      .addCase(getJobDetailsAsyncThunk.fulfilled, (state, action) => {
        state.jobDetails = action.payload;
      })
      .addCase(applyJobAsyncThunk.fulfilled, (state, action) => {
        state.appliedJob = action.payload;
      })
      // im using addMatcher to manage the asyncthunksMehtod actions like fullfilled,pending,rejected and also to manage the errors loading and error messages and async params
      .addMatcher(
        // isAsyncThunk will run when the action is an asyncthunk exists from giver asycntthunks
        isAnyOf(
          // reduxToolKitCaseBuilder helper make fullfilled, pending, and rejected cases
          ...reduxToolKitCaseBuilder([
            getJobsAsyncThunk,
            getJobDetailsAsyncThunk,
            getMyJobsAsyncThunk,
            // getMyJobRelatedAsyncThunk,
            applyJobAsyncThunk,
            getAvailableJobsByBrandAsyncThunk,
            getRecommendedJobsAsyncThunk,
            getAvailableJobsAsyncThunk,
            getMyJobsCountAsyncThunk,
            renewJobAsyncThunk,
            verifyJobInvitationAsyncThunk,
          ])
        ),
        handleLoadingErrorParamsForAsycThunk
      );
  },
});

export default jobSlice.reducer;
export const { setLoading, setSearchValue, setCategoryValue, setOrderValue } =
  jobSlice.actions;
