import agelgilAPI from "..";
import { IUser, IUserSignUpFrom, IUserLogInFrom } from "../types/user.type";

const userApiSlice = agelgilAPI.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<IUser, string>({
            query: (id) => `user/id/${id}`,
            providesTags: (result, error, id) => [{ type: 'User', id }],
            transformResponse: (response: any) => response.body,
        }),
        getUser: builder.query<IUser, void>({
            query: (id) => `user/`,
            providesTags: (result, error, id) => [{ type: 'User', result._id }],
            transformResponse: (response: any) => response.body,
        }),
        updateUser: builder.mutation<IUser, IUserUpdateRequest>({
            query: ({ id, ...data }) => ({
                url: `user/update/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
            transformResponse: (response: any) => response.body,

        }),
        getUserBookedRecipes: builder.query<any, { id: string; skip: number; limit: number }>({
            query: ({ id, skip, limit }) => `user/bookedRecipes/${skip}/${limit}`,
            providesTags: (result, error, { id }) => [{ type: 'User', id }],
            transformResponse: (response: any) => response.body,

        }),
        getMyRecipes: builder.query<any, { id: string; skip: number; limit: number }>({
            query: ({ id, skip, limit }) => `user/myRecipe/${skip}/${limit}`,
            providesTags: (result, error, { id }) => [{ type: 'User', id }],
            transformResponse: (response: any) => response.body,

        }),
        toggleBookedRecipe: builder.mutation<void, { id: string; recipeId: string }>({
            query: ({ id, recipeId }) => ({
                url: `user/bookedRecipes/toggle/${recipeId}`,
                method: 'GET',
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
            transformResponse: (response: any) => response.body,
        }),
        signUp: builder.mutation < IUser, data: IUserSignUpFrom > ({
            query: (data) => ({
                url: `/user/signUp`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
            transformResponse: (response: any) => response.body,
            onQueryStarted: async ({ queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    const authorizationToken = data?.header?.Authorization;
                    const refreshToken = data?.header?.RefreshToken;
                    if (authorizationToken && refreshToken) {
                        localStorage.setItem('agelgilAuthorizationToken', authorizationToken);
                        localStorage.setItem('agelgilRefreshToken', refreshToken);
                    }
                } catch (error) {
                    console.error('Failed to refresh token:', error);
                }
            },

        }),
        logIn: builder.mutation < IUser, data: IUserLogInFrom > ({
            query: (data) => ({
                url: `/user/logIn`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
            transformResponse: (response: any) => response.body,
            onQueryStarted: async ({ queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    const authorizationToken = data?.header?.Authorization;
                    const refreshToken = data?.header?.RefreshToken;
                    if (authorizationToken && refreshToken) {
                        localStorage.setItem('agelgilAuthorizationToken', authorizationToken);
                        localStorage.setItem('agelgilRefreshToken', refreshToken);
                    }
                } catch (error) {
                    console.error('Failed to refresh token:', error);
                }
            },
        }),
        refreshToken: builder.query<void, void>({
            query: () => ({
                url: `/user/refreshToken`,
                method: 'GET',
                headers: {
                    RefreshToken: `Bearer ${localStorage.getItem('agelgilRefreshToken')}`
                },
            }),
            providesTags: ['User'],
            onQueryStarted: async ({ queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    const authorizationToken = data?.header?.Authorization;
                    const refreshToken = data?.header?.RefreshToken;
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
                url: `/user/logOut`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
            onQueryStarted: async ({ queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    localStorage.removeItem('agelgilAuthorizationToken');
                    localStorage.removeItem('agelgilRefreshToken');
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