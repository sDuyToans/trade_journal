import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {tradeApi} from "../api/tradeApi.js";
import {newsApi} from "../api/newsApi.js";
import {authApi} from "../api/authApi.js";
import {forexApi} from "../api/forexApi.js";

export const store = configureStore({
    reducer: {
        [tradeApi.reducerPath]: tradeApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [forexApi.reducerPath]: forexApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        tradeApi.middleware,
        newsApi.middleware,
        authApi.middleware,
        forexApi.middleware
        ),
});

setupListeners(store.dispatch);