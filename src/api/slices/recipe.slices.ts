import agelgilAPI from "..";
import { INewRecipeFrom, INutritionData, IRecipe, IRecipeSearchFrom, IRecipeUpdateFrom } from "../types/recipe.type";

const recipeApiSlice = agelgilAPI.injectEndpoints({
    endpoints: (builder) => ({
        getRecipeById: builder.query<IRecipe, string>({
            query: (recipeId) => `/public/recipe/${recipeId}`,
            transformResponse: (response: { body: IRecipe }) => response.body,
            providesTags: (result, error, recipeId) => [{ type: 'Recipe', id: recipeId }],
        }),
        getRecipeCarbs: builder.query<INutritionData, string>({
            query: (recipeId) => `/public/recipe/carbs/${recipeId}`,
        }),
        getRecipes: builder.query<IRecipe[], { skip: number; limit: number }>({
            query: ({ skip, limit }) => `/public/recipe/list/${skip}/${limit}`,
            transformResponse: (response: { body: IRecipe[] }) => response.body,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((recipe) => ({ type: 'Recipe' as const, id: recipe._id })),
                        { type: 'Recipe' as const, id: 'Recipe-LIST' },
                    ]
                    : [{ type: 'Recipe' as const, id: 'Recipe-LIST' }],
        }),
        searchRecipes: builder.mutation<IRecipe[], { page: number; form: IRecipeSearchFrom }>({
            query: ({ page, form }) => ({
                url: `/public/recipe/search/${page}`,
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
        updateRecipe: builder.mutation<IRecipe, { recipeId: string; updates: IRecipeUpdateFrom }>({
            query: ({ recipeId, updates }) => ({
                url: `/private/recipe/update/${recipeId}`,
                method: 'PATCH',
                body: updates,
            }),
            invalidatesTags: (result, _, { recipeId }) => result ? [{ type: 'Recipe', id: recipeId }] : [],
        }),
    }),
});

export const {
    useGetRecipeByIdQuery,
    useGetRecipeCarbsQuery,
    useGetRecipesQuery,
    useSearchRecipesMutation,
    useCreateRecipeMutation,
    useUpdateRecipeMutation,
} = recipeApiSlice