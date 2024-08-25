import { configureStore } from "@reduxjs/toolkit";
import msSabaAPI from ".";


export const store = configureStore({
    reducer: {
        [msSabaAPI.reducerPath]: msSabaAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(msSabaAPI.middleware),
});