import agelgilAPI from "..";
import { IModerator, IModeratorLogInFrom, IModeratorRecipeUpdateFrom, IModeratorSignUpFrom, IModeratorUpdateFrom } from "../types/moderator.type";
import { ERecipeStatus, IRecipe } from "../types/recipe.type";

const moderatorApiSlice = agelgilAPI.injectEndpoints({
    endpoints: (builder) => ({
        getModeratorById: builder.query<IModerator, string>({
            query: (id) => `/public/moderator/id/${id}`,
            providesTags: (result, _, id) => result ? [{ type: 'Moderator', id }] : [],
            transformResponse: (response: { body: IModerator }) => response.body,
        }),
        getModerator: builder.query<IModerator, void>({
            query: () => `/private/moderator/`,
            providesTags: ['Moderator'],
            transformResponse: (response: { body: IModerator }) => response.body,
        }),
        updateModerator: builder.mutation<IModerator, { id: string, data: IModeratorUpdateFrom }>({
            query: ({ id, data }) => ({
                url: `/private/moderator/update/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, _, { id }) => result ? [{ type: 'Moderator', id }] : [],
            transformResponse: (response: { body: IModerator }) => response.body,
        }),
        moderatorSignUp: builder.mutation<IModerator, { data: IModeratorSignUpFrom }>({
            query: ({ data }) => ({
                url: `/public/moderator/signUp`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Moderator'],
            transformResponse: (response: { body: IModerator }) => response.body,

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
        moderatorIogIn: builder.mutation<IModerator, { data: IModeratorLogInFrom }>({
            query: ({ data }) => ({
                url: `/public/moderator/logIn`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Moderator'],
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
        moderatorRefreshToken: builder.query<void, void>({
            query: () => ({
                url: `/private/moderator/refreshToken`,
                method: 'GET',
                headers: {
                    RefreshToken: `Bearer ${localStorage.getItem('agelgilRefreshToken')}`
                },
            }),
            providesTags: ['Moderator'],
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
        moderatorIogOut: builder.mutation<void, void>({
            query: () => ({
                url: `/private/moderator/logOut`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Moderator'],
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
        updateRecipeStatus: builder.mutation<IRecipe, { recipeId: string; updates: IModeratorRecipeUpdateFrom }>({
            query: ({ recipeId, updates }) => ({
                url: `/moderator/updateRecipeStatus/${recipeId}`,
                method: 'PATCH',
                body: updates,
            }),
            invalidatesTags: (result, _, { recipeId }) => result ? [{ type: 'Recipe', id: recipeId }] : [],
        }),
        moderatedRecipes: builder.query<IRecipe[], { status: ERecipeStatus, skip: number; limit: number }>({
            query: ({ status, skip, limit }) => `/moderator/recipes/${status}?skip=${skip}&limit=${limit}`,
            providesTags: (result, _, { status }) => result ? [{ type: 'Recipe', status }] : [],
            transformResponse: (response: { body: IRecipe[] }) => response.body,
        }),
    }),
});

export const {
    useGetModeratorByIdQuery,
    useGetModeratorQuery,
    useUpdateModeratorMutation,
    useModeratorSignUpMutation,
    useModeratorIogInMutation,
    useModeratorRefreshTokenQuery,
    useModeratorIogOutMutation,
    useUpdateRecipeStatusMutation,
    useModeratedRecipesQuery
} = moderatorApiSlice