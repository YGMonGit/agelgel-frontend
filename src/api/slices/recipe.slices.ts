import agelgilAPI from "..";
import { EPreferredMealTime, EPreferredMealTimeFilter, INewRecipeFrom, INutritionData, IRecipe, IRecipeSearchFrom, IRecipeToEdit, IRecipeUpdateFrom } from "../types/recipe.type";

const recipeApiSlice = agelgilAPI.injectEndpoints({
    endpoints: (builder) => ({
        getRecipeById: builder.query<IRecipeToEdit, string>({
            query: (recipeId) => `/public/recipe/${recipeId}`,
            transformResponse: (response: { body: IRecipeToEdit }) => response.body,
            providesTags: (result, error, recipeId) => [{ type: 'Recipe', id: recipeId }],
        }),
        getPrivateRecipeById: builder.query<IRecipe, string>({
            query: (recipeId) => `/private/recipe/details/user/${recipeId}`,
            transformResponse: (response: { body: IRecipe }) => response.body,
            providesTags: (result, error, recipeId) => [{ type: 'Recipe', id: recipeId }],
        }),
        getModeratorRecipeById: builder.query<IRecipe, string>({
            query: (recipeId) => `/private/recipe/details/moderator/${recipeId}`,
            transformResponse: (response: { body: IRecipe }) => response.body,
            providesTags: (result, error, recipeId) => [{ type: 'Recipe', id: recipeId }],
        }),
        getRecipeCarbs: builder.query<INutritionData, string>({
            query: (recipeId) => `/public/recipe/carbs/${recipeId}`,
        }),
        getRecipes: builder.query<IRecipe[], { skip: number; limit: number, filter: string }>({
            query: ({ skip, limit, filter }) => `/public/recipe/list/${filter}/${skip}/${limit}`,
            transformResponse: (response: { body: IRecipe[] }) => response.body,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((recipe) => ({ type: 'Recipe' as const, id: recipe._id })),
                        { type: 'Recipe' as const, id: 'Recipe-LIST' },
                    ]
                    : [{ type: 'Recipe' as const, id: 'Recipe-LIST' }],
        }),
        getModeratorRecipes: builder.query<IRecipe[], { skip: number; limit: number, filter: string }>({
            query: ({ skip, limit, filter }) => `/private/recipe/moderator/list/${skip}/${limit}/${filter}`,
            transformResponse: (response: { body: IRecipe[] }) => response.body,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((recipe) => ({ type: 'Recipe' as const, id: recipe._id })),
                        { type: 'Recipe' as const, id: 'Recipe-LIST' },
                    ]
                    : [{ type: 'Recipe' as const, id: 'Recipe-LIST' }],
        }),
        userSearchRecipes: builder.mutation<IRecipe[], { page: number; form: IRecipeSearchFrom }>({
            query: ({ page, form }) => ({
                url: `/public/recipe/user/search/${page}`,
                method: 'POST',
                body: form,
            }),
            transformResponse: (response: { body: IRecipe[] }) => response.body,
            invalidatesTags: (result) =>
                result
                    ? [
                        ...result.map((recipe) => ({ type: 'Recipe' as const, id: recipe._id })),
                        { type: 'Recipe' as const, id: 'Recipe-SEARCH' },
                    ]
                    : [{ type: 'Recipe' as const, id: 'Recipe-SEARCH' }],
        }),
        moderatorSearchRecipes: builder.mutation<IRecipe[], { page: number; form: IRecipeSearchFrom }>({
            query: ({ page, form }) => ({
                url: `/public/recipe/moderator/search/${page}`,
                method: 'POST',
                body: form,
            }),
            transformResponse: (response: { body: IRecipe[] }) => response.body,
            invalidatesTags: (result) =>
                result
                    ? [
                        ...result.map((recipe) => ({ type: 'Recipe' as const, id: recipe._id })),
                        { type: 'Recipe' as const, id: 'Recipe-SEARCH' },
                    ]
                    : [{ type: 'Recipe' as const, id: 'Recipe-SEARCH' }],
        }),
        createRecipe: builder.mutation<IRecipe, INewRecipeFrom>({
            query: (newRecipe) => ({
                url: '/private/recipe/create',
                method: 'POST',
                body: newRecipe,
            }),
            invalidatesTags: (result) => result ? [{ type: 'Recipe', id: result?._id }] : [],
        }),
        updateRecipe: builder.mutation<IRecipeToEdit, { recipeId: string; updates: IRecipeUpdateFrom }>({
            query: ({ recipeId, updates }) => ({
                url: `/private/recipe/update/${recipeId}`,
                method: 'PATCH',
                body: updates,
            }),
            invalidatesTags: (result, _, { recipeId }) => result ? [{ type: 'Recipe', id: recipeId }] : [],
        }),
        recommendation: builder.query<IRecipe[], { page: number }>({
            query: ({ page }) => `/private/recipe/recommendation/${page}`,
            transformResponse: (response: { body: IRecipe[] }) => response.body,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((recipe) => ({ type: 'Recipe' as const, id: recipe._id })),
                        { type: 'Recipe' as const, id: 'Recipe-LIST' },
                    ]
                    : [{ type: 'Recipe' as const, id: 'Recipe-LIST' }],
        }),
        similar: builder.query<IRecipe[], { recipeId: string, page: number }>({
            query: ({ page, recipeId }) => `/public/recipe/similar/${recipeId}/${page}`,
            transformResponse: (response: { body: IRecipe[] }) => response.body,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((recipe) => ({ type: 'Recipe' as const, id: (recipe as any).recipeId })),
                        { type: 'Recipe' as const, id: 'Recipe-LIST' },
                    ]
                    : [{ type: 'Recipe' as const, id: 'Recipe-LIST' }],
        }),
        removeRecipe: builder.mutation<void, string>({
            query: (recipeId) => ({
                url: `/private/recipe/remove/${recipeId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, recipeId) => [{ type: 'Recipe', id: recipeId }],
        }),
    }),

});

export const {
    useGetRecipeByIdQuery,
    useGetPrivateRecipeByIdQuery,
    useGetModeratorRecipeByIdQuery,
    useGetRecipeCarbsQuery,
    useGetRecipesQuery,
    useGetModeratorRecipesQuery,
    useUserSearchRecipesMutation,
    useModeratorSearchRecipesMutation,
    useCreateRecipeMutation,
    useUpdateRecipeMutation,
    useRecommendationQuery,
    useSimilarQuery,
    useRemoveRecipeMutation,
} = recipeApiSlice