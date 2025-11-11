import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const forexApi = createApi({
    reducerPath: "forexApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1",
        // credentials: "include"
    }),
    endpoints: (builder) => ({
        getCandle: builder.query(
            {
                query: ({ fromPair, toPair }) => `/forex/candles?fromPair=${fromPair}&toPair=${toPair}`
            }
        ),
        getBaseLine: builder.query(
            {
                query: ({ fromPair, toPair }) => `/forex/baselines?fromPair=${fromPair}&toPair=${toPair}`
            }
        ),
        getPredict: builder.query({
            query: ({ fromPair, toPair, model, window, days}) => ({
                url: "/forex/predict",
                method: "POST",
                body: { fromPair, toPair, model, window, days}
            })
        })
    })
})

export const { useGetCandleQuery, useGetBaseLineQuery, useGetPredictQuery } = forexApi;