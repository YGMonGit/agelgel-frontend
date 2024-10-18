import agelgilAPI from "..";
import { ERecipeStatus, IRecipe } from "../types/recipe.type";
import { IUser, IUserSignUpFrom, IUserLogInFrom, IUserUpdateFrom, IModeratorUserUpdateSchema, EVerified } from "../types/user.type";

const userApiSlice = agelgilAPI.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<IUser, string>({
            query: (id) => `/public/user/id/${id}`,
            providesTags: (result, _, id) => result ? [{ type: 'User', id }] : [],
            transformResponse: (response: { body: IUser }) => response.body,
        }),
        getUser: builder.query<IUser, void>({
            query: () => `/private/user/`,
            providesTags: (result) => result ? [{ type: 'User', id: result._id }] : [],
            transformResponse: (response: { body: IUser }) => response.body,
        }),
        updateUser: builder.mutation<IUser, { id: string, data: IUserUpdateFrom }>({
            query: ({ data }) => ({
                url: `/private/user/update`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, _, { id }) => result ? [{ type: 'User', id }] : [],
            transformResponse: (response: { body: IUser }) => response.body,
        }),
        getUserBookedRecipes: builder.query<IRecipe[], { skip: number; limit: number }>({
            query: ({ skip, limit }) => `/private/user/bookedRecipes/${skip}/${limit}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((recipe) => ({ type: 'Recipe' as const, id: recipe._id })),
                        { type: 'Recipe' as const, id: 'BookRecipe' },
                    ]
                    : [{ type: 'Recipe' as const, id: 'BookRecipe' }],
            transformResponse: (response: { body: IRecipe[] }) => response.body,
        }),
        getMyRecipes: builder.query<IRecipe[], { status: ERecipeStatus, skip: number; limit: number }>({
            query: ({ skip, limit, status }) => `/private/user/myRecipe/${status}/${skip}/${limit}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((recipe) => ({ type: 'Recipe' as const, id: recipe._id })),
                        { type: 'Recipe' as const, id: 'MyRecipe' },
                    ]
                    : [{ type: 'Recipe' as const, id: 'MyRecipe' }],
            transformResponse: (response: { body: IRecipe[] }) => response.body,
        }),
        toggleBookedRecipe: builder.mutation<IRecipe[], { recipeId: string }>({
            query: ({ recipeId }) => ({
                url: `/private/user/bookedRecipes/toggle/${recipeId}`,
                method: 'PATCH',
            }),
            invalidatesTags: (result, _, { recipeId }) => [{ type: 'Recipe', id: recipeId }],
            transformResponse: (response: { body: IRecipe[] }) => response.body,

        }),
        signUp: builder.mutation<IUser, { data: IUserSignUpFrom }>({
            query: ({ data }) => ({
                url: `/public/user/signUp`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
            transformResponse: (response: { body: IUser }) => response.body,

            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const { meta } = await queryFulfilled;
                    const authorizationToken = meta?.response?.headers.get("Authorization");
                    const refreshToken = meta?.response?.headers.get("RefreshToken");
                    if (authorizationToken && refreshToken) {
                        localStorage.setItem('agelgilAuthorizationToken', authorizationToken.split("Bearer ")[1].trim());
                        localStorage.setItem('agelgilRefreshToken', refreshToken.split("Bearer ")[1].trim());
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
                        localStorage.setItem('agelgilAuthorizationToken', authorizationToken.split("Bearer ")[1].trim());
                        localStorage.setItem('agelgilRefreshToken', refreshToken.split("Bearer ")[1].trim());
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
                    await queryFulfilled;
                    localStorage.removeItem('agelgilAuthorizationToken');
                    localStorage.removeItem('agelgilRefreshToken');
                } catch (error) {
                    console.error('Failed to refresh token:', error);
                }
            },
        }),
        listUsers: builder.query<IUser[], { page: number; verified: EVerified }>({
            query: ({ page, verified }) => `/private/user/list/${page}/${verified}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((user) => ({ type: 'Users' as const, id: user._id })),
                        { type: 'Users' as const, id: 'List' },
                    ]
                    : [{ type: 'Users' as const, id: 'List' }],
            transformResponse: (response: { body: IUser[] }) => response.body,
        }),
        sendEmailOtp: builder.mutation<void, { email: string }>({
            query: ({ email }) => ({
                url: `/public/user/sendEmailOtp/${email}`,
                method: 'GET'
            }),
        }),
        forgotPassword: builder.mutation<void, { email: string, otp: string, password: string }>({
            query: ({ email, otp, password }) => ({
                url: `/public/user/forgotPassword/email/${otp}/${email}/${password}`,
                method: 'PATCH',
                body: { email, otp, password }
            }),
        }),
        changePassword: builder.mutation<void, { oldPassword: string, newPassword: string }>({
            query: ({ oldPassword, newPassword }) => ({
                url: `/private/user/changePassword`,
                method: 'PATCH',
                body: { oldPassword, newPassword }
            }),
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
    useListUsersQuery,
    useSendEmailOtpMutation,
    useForgotPasswordMutation,
    useChangePasswordMutation,
} = userApiSlice