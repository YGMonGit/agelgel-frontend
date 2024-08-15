import agelgilAPI from "..";
import { IIngredient, INewIngredientFrom, IngredientUpdateFrom } from "../types/ingredient.type";
import { INewRecipeFrom, INutritionData, IRecipe, IRecipeSearchFrom, IRecipeUpdateFrom } from "../types/recipe.type";

const ingredientApiSlice = agelgilAPI.injectEndpoints({
    endpoints: (builder) => ({
        getIngredientById: builder.query<IIngredient, string>({
            query: (ingredientsId) => `/ingredients/${ingredientsId}`,
            transformResponse: (response: { body: IIngredient }) => response.body,
            providesTags: (result, error, ingredientsId) => result ? [{ type: 'Ingredient', id: ingredientsId }] : [],
        }),
        getIngredients: builder.query<IIngredient[], { skip: number; limit: number }>({
            query: ({ skip, limit }) => `/ingredients/list/${skip}/${limit}`,
            transformResponse: (response: { body: IIngredient[] }) => response.body,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Ingredient' as const, id: _id })),
                        { type: 'Ingredient' as const, id: 'Ingredient-LIST' },
                    ]
                    : [{ type: 'Ingredient' as const, id: 'Ingredient-LIST' }],
        }),
        createIngredient: builder.mutation<IIngredient, INewIngredientFrom>({
            query: (newIngredient) => ({
                url: '/ingredients',
                method: 'POST',
                body: newIngredient,
            }),
            invalidatesTags: [{ type: 'Ingredient', id: 'Ingredient' }],
        }),
        updateIngredient: builder.mutation<IIngredient, { ingredientsId: string; updates: IngredientUpdateFrom }>({
            query: ({ ingredientsId, updates }) => ({
                url: `/ingredients/${ingredientsId}`,
                method: 'PATCH',
                body: updates,
            }),
            invalidatesTags: (result, error, { ingredientsId }) => result ? [{ type: 'Ingredient', id: ingredientsId }] : [],
        }),
    }),
});

export const {
    useGetIngredientByIdQuery,
    useGetIngredientsQuery,
    useCreateIngredientMutation,
    useUpdateIngredientMutation,
} = ingredientApiSlice