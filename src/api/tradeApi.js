import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:8080/api/v1/trade"

export const tradeApi = createApi({
    reducerPath: "tradeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        credentials: "include"
    }),
    tagTypes: ['Trade'],
    endpoints: (builder) => ({
        getTrades: builder.query({
            query: () => "",
            providesTags: ['Trade'] // -> max this trade list data as cached
        }),
        saveTrade: builder.mutation({
            query: (tradeRequestDto) => ({
                url: "",
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