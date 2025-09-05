import { toast } from "react-toastify";
import { setError, setErrorForReload } from "./errors/handleErrorsAndPayloads";
import type { AnyAction, Dispatch } from "redux";

// Define a more specific error type
interface ErrorResponse {
  code?: string;
  response?: {
    status?: number;
    data?: {
      errors?: Record<string, string>;
      message?: string;
      status?: string | number;
    };
  };
  reason?: string;
  [key: string]: unknown;
}

export const detectError = (
  error: ErrorResponse,
  dispatch: Dispatch<AnyAction>,
  rejectWithValue?: (error: ErrorResponse) => unknown
): unknown => {
  if (error.code === "ERR_NETWORK" && error.response?.status === 0) {
    dispatch(
      setErrorForReload({
        errorCode: 0,
        errorMessage: "Server is unavailable",
      })
    );
    return rejectWithValue ? rejectWithValue(error) : undefined;
  }
  if (typeof error === "object" && error["reason"])
    return toast.error(error["reason"]);
  if (error?.response) {
    if (error.response?.status === 422) {
      if (error.response?.data?.errors) {
        const errors =
          error.response && error.response.data && error.response.data.errors;
        if (errors) {
          Object.keys(errors).forEach((item) =>
            dispatch(
              setError({
                errorCode: error.response
                  ? error.response.status ?? error.response.data?.status
                  : undefined,
                errorMessage: `${item} : ${errors[item]}`,
              })
            )
          );
        }
      }
    } else {
      dispatch(
        setError({
          errorCode: error.response.status ?? error?.response?.data?.status,
          errorMessage:
            error?.response?.data?.message || error?.response?.data?.status,
        })
      );
    }
  }
  if (rejectWithValue) {
    return rejectWithValue(error);
  }
};

export function spreadObjValuesNotNull<
  T extends Record<string, unknown> | null | undefined
>(ob: T): T {
  if (typeof ob === "object" && ob) {
    const tempObj: Record<string, unknown> = {};
    Object.keys(ob).forEach((key) => {
      tempObj[key] = (ob as Record<string, unknown>)[key] ?? "";
    });
    return tempObj as T;
  } else {
    return ob;
  }
}
