import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { ApiRequests } from "../../service/ApiRequests";
import {
  catchAsync,
  handleLoadingErrorParamsForAsycThunk,
  reduxToolKitCaseBuilder,
} from "../detectError";
import { toast } from "react-toastify";

// user Login With Credentials
export const userLoginAsyncThunk = createAsyncThunk(
  "auth/userLoginAsyncThunk",
  catchAsync(async ({ email, password, router }, { dispatch }) => {
    const response = await ApiRequests.login({
      email,
      password,
      role: "creator",
    });
    if (response) {
      if (response?.status === 200) {
        toast.success("Success! You’re now securely logged in. Welcome back!", {
          autoClose: 2000,
        });
        if (response?.data?.user?.role === "brand") {
          router("/dashboard");
        } else if (response?.data?.user?.role === "creator") {
          router("/dashboard");
        } else if (response?.data?.user?.role === "admin") {
          router("/dashboard");
        } else {
          router("/dashboard");
        }
      } else {
        router("/sign-in");
        toast.error(response.error);
      }
    }
    return response?.data;
  })
);
// user Login With Credentials
export const authenticateAsyncThunk = createAsyncThunk(
  "auth/authenticateAsyncThunk",
  catchAsync(async (__, _) => {
    const token = localStorage.getItem("access-token");
    if (!token || token === "null") {
      return null;
    }
    let response = null

    const adminId = localStorage.getItem("adminId");
    if (adminId) {
      response = await ApiRequests.authenticate({ adminId });
    } else {
      response = await ApiRequests.authenticate();
    }
    return response?.data;
  })
);

export const userLogoutAsyncThunk = createAsyncThunk(
  "auth/userLogoutAsyncThunk",
  catchAsync(async (_, { router, callBack }) => {
    const refreshToken = localStorage.getItem("refresh-token");
    if (!refreshToken || refreshToken === "null") {
      return;
    }
    const response = await ApiRequests.logout({ refreshToken });
    if (response) {
      if (response?.status === 204) {
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
        localStorage.removeItem("adminId");
        localStorage.removeItem("user");
        toast.success("LogOut Successfully!!!", {
          autoClose: 2000,
        });
        router("/brand/sign-in");
        if (callBack) callBack();
      } else {
        toast.error(response.error);
      }
      window.location.href = process.env.REACT_APP_CREATOR_BASE_URL + "sign-in";
    }
    return true;
  })
);

export const logoutFromAllDevicesAsyncThunk = createAsyncThunk(
  "auth/logoutFromAllDevicesAsyncThunk",
  catchAsync(async (_, { router }) => {
    const refreshToken = localStorage.getItem("refresh-token");
    if (!refreshToken || refreshToken === "null") {
      return;
    }
    const response = await ApiRequests.logoutAllDevices({ refreshToken });
    if (response) {
      if (response?.status === 200) {
        toast.success(
          "You have been successfully logged out from all devices.",
          {
            autoClose: 2000,
          }
        );
      } else {
        toast.error(response.error);
      }
    }
    return true;
  })
);

// user register With Credentials
export const userRegisterAsyncThunk = createAsyncThunk(
  "auth/userRegisterAsyncThunk",
  catchAsync(async ({ data, router, callBack }) => {
    const response = await ApiRequests.register(data);
    console.log("response", response);
    if (response) {
      if (response?.status == 201) {
        toast.success("Registered Successfully!", {
          autoClose: 2000,
        });
        router("/");
      } else {
        toast.error(response.error);
      }
    }
    if (callBack) callBack();
    return response?.data;
  })
);

// user register With Credentials
export const userForgetPasswordAsyncThunk = createAsyncThunk(
  "auth/userForgetPasswordAsyncThunk",
  catchAsync(async ({ email, navigate }) => {
    const response = await ApiRequests.forgotpassword({ email });
    if (response) {
      if (response?.status == 201 || response?.status == 200) {
        navigate("/email-sent");
        // toast.success("Reset password link sent successfully!", {
        //   autoClose: 2000,
        // });
      } else {
        toast.error(response.error);
      }
    }
    return response?.data;
  })
);

// user register With Credentials
export const userResetPasswordAsyncThunk = createAsyncThunk(
  "auth/userResetPasswordAsyncThunk",
  catchAsync(async ({ password, token, navigate }) => {
    const response = await ApiRequests.resetPassword({ password, token });
    if (response) {
      if (response?.status == 204 || response?.status == 200) {
        // toast.success("Password updated successfully!", {
        //   autoClose: 2000,
        // });
        navigate("/password-changed");
      } else {
        console.log("response", response);
        toast.error(response.error);
      }
    }
    return response?.data;
  })
);

// user register With Credentials
export const userUpdatePasswordAsyncThunk = createAsyncThunk(
  "auth/userUpdatePasswordAsyncThunk",
  catchAsync(async ({ data, callBack }) => {
    const response = await ApiRequests.updatePassword(data);
    if (response) {
      if (response?.status == 204 || response?.status == 200) {
        toast.success("Password updated successfully!", {
          autoClose: 2000,
        });
        if (callBack) callBack();
      } else {
        toast.error(response.error);
      }
    }
    return response?.data;
  })
);

// user register With Credentials
export const updateCreatorProfileAsyncThunk = createAsyncThunk(
  "creator/updateCreatorProfileAsyncThunk",
  catchAsync(async ({ data, callBack }, { dispatch, getState }) => {
    const response = await ApiRequests.updateCreator(data);
    if (response.status === 204) {
      toast.success("Creator Updated Successfully!");
    }
    console.log("response?.data", response?.data);

    dispatch(storeProfile(response?.data));
    dispatch(setCreator(response?.data));
    if (callBack) callBack();
    // dispatch(getCreatorsByIdsAsyncThunk({ populate: "image,creator_id", ...state.creators?.paramsForThunk?.getCreatorsByIdsAsyncThunk, page: 1 }))
    return response?.data;
  })
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  catchAsync(async ({ data, callBack }, { dispatch, getState }) => {
    const state = getState();
    const response = await ApiRequests.updateProfile(data);
    if (response?.data?.user) {
      dispatch(storeUser(response?.data?.user));
      // toast.success("Your information has been updated successfully");.
      if (callBack) {
        callBack();
        console.log("Hello from callback");
      }
    }
    if (response.status !== 200) {
      toast.error(response.data.message);
      return;
    }

    return response?.data;
  })
);

export const sendEmailVerificationAsyncThunk = createAsyncThunk(
  "auth/sendEmailVerificationAsyncThunk",
  catchAsync(async ({ callBack }) => {
    const response = await ApiRequests.sendVerificationLink();
    if (callBack) callBack();
    return response?.data;
  })
);

export const verifyEmailAsyncThunk = createAsyncThunk(
  "auth/verifyEmailAsyncThunk",
  catchAsync(async ({ token, callBack }, { dispatch, getState }) => {
    const response = await ApiRequests.verifyEmail(token);
    if (response && response?.status === 204) {
      const currentUser = getState().auth.user;
      if (currentUser) {
        dispatch(storeUser({ ...currentUser, isEmailVerified: true }));
      }
    }
    if (callBack) callBack();
    return response?.data;
  })
);

export const verifyTokenExpiryAsyncThunk = createAsyncThunk(
  "auth/verifyTokenExpiryAsyncThunk",
  catchAsync(async ({ }) => {
    const response = await ApiRequests.verifyTokenExpiry();
    console.log("verifyTokenExpiryAsyncThunk response", response);
    return response?.data;
  })
);

const initialState = {
  //news states
  user: null,
  showSidebarOrNot: false,
  tokens: null,
  profile: null,
  brand: null,
  admin: null,
  isScreenLock: false,
  creator: null,
  verifyEmailRes: false,
  // manager states
  errors: {},
  loadings: {
    authenticateAsyncThunk: true,
    userUpdatePasswordAsyncThunk: false,
  },
  errorMessages: {},
  errorCodes: {},
  paramsForThunk: {},
};

const blogSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    storeProfile: (state, action) => {
      state.profile = action.payload;
    },
    setCreator: (state, action) => {
      state.creator = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setScreenLock: (state, action) => {
      state.isScreenLock = action.payload;
    },
    toggleSidebarMobile: (state, action) => {
      state.showSidebarOrNot = action.payload;
    },
    setCreatorNotifications: (state, action) => {
      if (state.creator) {
        state.creator.notifications = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoginAsyncThunk.fulfilled, (state, action) => {
        state.user = action.payload?.user.user;
        state.tokens = action.payload?.user?.session;
        localStorage.setItem(
          "access-token",
          action.payload?.tokens?.access?.token
        );
        localStorage.setItem(
          "refresh-token",
          action.payload?.tokens?.refresh?.token
        );
        localStorage.setItem("user", JSON.stringify(action.payload?.user));
      })
      .addCase(userRegisterAsyncThunk.fulfilled, (state, action) => {
        state.user = action.payload?.user.user;
        state.tokens = action.payload?.user?.session;

        localStorage.setItem(
          "access-token",
          action.payload?.tokens?.access?.token
        );
        localStorage.setItem(
          "refresh-token",
          action.payload?.tokens?.refresh?.token
        );
        localStorage.setItem("user", JSON.stringify(action.payload?.user));
      })
      .addCase(userLogoutAsyncThunk.fulfilled, (state, action) => {
        state.user = null;
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
        localStorage.removeItem("user");
        localStorage.removeItem("adminId");
      })
      .addCase(authenticateAsyncThunk.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        state.brand = action.payload?.brand;
        state.creator = action.payload?.creator;
        state.admin = action.payload?.admin;
        state.profile = action.payload?.creator ?? action.payload?.brand;
      })
      .addCase(updateCreatorProfileAsyncThunk.fulfilled, (state, action) => {
        state.creator = action.payload;
        state.logScreen = true;
      })
      .addCase(verifyTokenExpiryAsyncThunk.fulfilled, (state, action) => {
        state.verifyEmailRes = action.payload;
      })

      // im using addMatcher to manage the asyncthunksMehtod actions like fullfilled,pending,rejected and also to manage the errors loading and error messages and async params
      .addMatcher(
        // isAsyncThunk will run when the action is an asyncthunk exists from giver asycntthunks
        isAnyOf(
          // reduxToolKitCaseBuilder helper make fullfilled, pending, and rejected cases
          ...reduxToolKitCaseBuilder([
            userLoginAsyncThunk,
            userRegisterAsyncThunk,
            // refreshTokensAsyncThunk,
            authenticateAsyncThunk,
            userLogoutAsyncThunk,
            logoutFromAllDevicesAsyncThunk,
            updateCreatorProfileAsyncThunk,
            updateProfile,
            userUpdatePasswordAsyncThunk,
            userForgetPasswordAsyncThunk,
            userResetPasswordAsyncThunk,
            verifyEmailAsyncThunk,
            sendEmailVerificationAsyncThunk,
            verifyTokenExpiryAsyncThunk,
          ])
        ),
        handleLoadingErrorParamsForAsycThunk
      );
  },
});

export default blogSlice.reducer;
export const {
  storeUser,
  storeProfile,
  setCreator,
  setBrand,
  setScreenLock,
  toggleSidebarMobile,
} = blogSlice.actions;
