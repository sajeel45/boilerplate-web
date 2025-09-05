// Minimal module declaration for modelSlice.js

import type { AnyAction } from 'redux';

export interface HandleModelPayload {
	state: boolean;
	model: string;
	args?: Record<string, unknown>;
}

export function handleModel(payload: HandleModelPayload): AnyAction;

const model: unknown;
export default model;
