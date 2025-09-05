// Minimal module declaration to suppress TS errors for JS import
export interface ErrorPayload {
	errorCode: number | string | undefined;
	errorMessage: string | undefined;
}
import type { AnyAction } from 'redux';
export declare function setError(payload: ErrorPayload): AnyAction;
export declare function setErrorForReload(payload: { errorCode: number; errorMessage: string }): AnyAction;