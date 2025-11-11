import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:8080/api/v1/news";

export const newsApi = createApi({
    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        // credentials: "include"
    }),
    endpoints: (builder) => ({
        getForexNews: builder.query({
            query: () => ""
        })
    })
})

export const { useGetForexNewsQuery } = newsApi;

