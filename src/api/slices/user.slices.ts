import agelgilAPI from "..";
import { IUser, IUserSignUpFrom, IUserLogInFrom, IUserUpdateFrom } from "../types/user.type";

const userApiSlice = agelgilAPI.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<IUser, string>({
            query: (id) => `/public/user/id/${id}`,
            providesTags: (result, error, id) => [{ type: 'User', id }],
            transformResponse: (response: any) => response.body,
        }),
        getUser: builder.query<IUser, void>({
            query: () => `/private/user/`,
            providesTags: ['User'],
            transformResponse: (response: any) => response.body,
        }),
        updateUser: builder.mutation<IUser, { id: string, data: IUserUpdateFrom }>({
            query: ({ id, data }) => ({
                url: `/private/user/update/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
            transformResponse: (response: any) => response.body,

        }),
        getUserBookedRecipes: builder.query<any, { skip: number; limit: number }>({
            query: ({ skip, limit }) => `/private/user/bookedRecipes/${skip}/${limit}`,
            //TODO: add recipe tag
            // providesTags: (result, error, { id }) => [{ type: 'User', id }], 
            transformResponse: (response: any) => response.body,

        }),
        getMyRecipes: builder.query<any, { skip: number; limit: number }>({
            query: ({ skip, limit }) => `/private/user/myRecipe/${skip}/${limit}`,
            //TODO: add recipe tag
            // providesTags: (result, error, { id }) => [{ type: 'User', id }],
            transformResponse: (response: any) => response.body,

        }),
        toggleBookedRecipe: builder.mutation<void, { recipeId: string }>({
            query: ({ recipeId }) => ({
                url: `/private/user/bookedRecipes/toggle/${recipeId}`,
                method: 'GET',
            }),
            //TODO: add recipe tag
            // invalidatesTags: (result, error) => [{ type: 'User', id }],
            transformResponse: (response: any) => response.body,
        }),
        signUp: builder.mutation<IUser, { data: IUserSignUpFrom }>({
            query: ({ data }) => ({
                url: `/public/user/signUp`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
            transformResponse: (response: any) => response.body,
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const { meta } = await queryFulfilled;
                    const authorizationToken = meta?.response?.headers.get("Authorization");
                    const refreshToken = meta?.response?.headers.get("RefreshToken");
                    if (authorizationToken && refreshToken) {
                        localStorage.setItem('agelgilAuthorizationToken', authorizationToken);
                        localStorage.setItem('agelgilRefreshToken', refreshToken);
                    }
                } catch (error) {
                    console.error('Failed to refresh token:', error);
                }
            },

        }),
        logIn: builder.mutation<IUser, { data: IUserLogInFrom }>({
            query: ({ data }) => ({
                url: `/public/user/logIn`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const { meta, data } = await queryFulfilled;
                    const authorizationToken = meta?.response?.headers.get("Authorization");
                    const refreshToken = meta?.response?.headers.get("RefreshToken");
                    if (authorizationToken && refreshToken) {
                        localStorage.setItem('agelgilAuthorizationToken', authorizationToken.split("Bearer")[1].trim());
                        localStorage.setItem('agelgilRefreshToken', refreshToken.split("Bearer")[1].trim());
                    }
                } catch (error) {
                    console.error('Failed to refresh token:', error);
                }
            },
        }),
        refreshToken: builder.query<void, void>({
            query: () => ({
                url: `/private/user/refreshToken`,
                method: 'GET',
                headers: {
                    RefreshToken: `Bearer ${localStorage.getItem('agelgilRefreshToken')}`
                },
            }),
            providesTags: ['User'],
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const { meta } = await queryFulfilled;
                    const authorizationToken = meta?.response?.headers.get("Authorization");
                    const refreshToken = meta?.response?.headers.get("RefreshToken");
                    if (authorizationToken && refreshToken) {
                        localStorage.setItem('agelgilAuthorizationToken', authorizationToken);
                        localStorage.setItem('agelgilRefreshToken', refreshToken);
                    }
                } catch (error) {
                    console.error('Failed to refresh token:', error);
                }
            },
        }),
        logOut: builder.mutation<void, void>({
            query: () => ({
                url: `/private/user/logOut`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const { meta } = await queryFulfilled;
                    const authorizationToken = meta?.response?.headers.get("Authorization");
                    const refreshToken = meta?.response?.headers.get("RefreshToken");
                    if (authorizationToken && refreshToken) {
                        localStorage.setItem('agelgilAuthorizationToken', authorizationToken);
                        localStorage.setItem('agelgilRefreshToken', refreshToken);
                    }
                } catch (error) {
                    console.error('Failed to refresh token:', error);
                }
            },
        }),
    }),
});

export const {
    useGetUserByIdQuery,
    useGetUserQuery,
    useUpdateUserMutation,
    useGetUserBookedRecipesQuery,
    useGetMyRecipesQuery,
    useToggleBookedRecipeMutation,
    useSignUpMutation,
    useLogInMutation,
    useRefreshTokenQuery,
    useLogOutMutation,
} = userApiSlice