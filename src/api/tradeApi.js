import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const apiURL = import.meta.env.VITE_BASE_URL;

export const tradeApi = createApi({
    reducerPath: "tradeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiURL,
        credentials: "include"
    }),
    tagTypes: ['Trade'],
    endpoints: (builder) => ({
        getTrades: builder.query({
            query: () => "/trade",
            providesTags: ['Trade'] // -> max this trade list data as cached
        }),
        saveTrade: builder.mutation({
            query: (tradeRequestDto) => ({
                url: "/trade",
                method: "POST",
                body: tradeRequestDto,
                headers: {
                    "Content-Type": "application/json"
                }
            }),
            invalidatesTags: ['Trade'] // triggers re-fetch or getTradesByUserId
        })
    })
})

export const { useGetTradesQuery, useSaveTradeMutation } = tradeApi;