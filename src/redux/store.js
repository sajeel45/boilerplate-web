import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: rootReducer, // Add your reducers here
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
        serializableCheck: false,
    });
},
});
