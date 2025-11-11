import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1",
        credentials: "include"
    }),
    endpoints: (builder) => ({
        verifyGoogleToken: builder.mutation({
            query: (googleToken) => ({
                url: "/auth/google",
                method: "POST",
                body: {token: googleToken}
            })
        }),
        getSecureData: builder.query({
            query: () => "/secure-date"
        }),
        signUp: builder.mutation({
            query: (signUpRequestDto) => ({
                url: "/auth/signup",
                method: "POST",
                body: signUpRequestDto
            })
        }),
        login: builder.mutation({
            query: (loginRequestDto) => ({
                url: "/auth/login",
                method: "POST",
                body: loginRequestDto
            })
        }),
        validateToken: builder.query({
            query: () => "/auth/validate-token"
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
                credentials: "include"
            })
        })
    })
})

export const {
    useVerifyGoogleTokenMutation,
    useGetSecureDataQuery,
    useSignUpMutation,
    useLoginMutation,
    useValidateTokenQuery,
    useLogoutMutation
} = authApi;