import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const apiURL = import.meta.env.VITE_BASE_URL;

export const newsApi = createApi({
    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiURL,
        // credentials: "include"
    }),
    endpoints: (builder) => ({
        getForexNews: builder.query({
            query: () => "/news"
        })
    })
})

export const { useGetForexNewsQuery } = newsApi;

