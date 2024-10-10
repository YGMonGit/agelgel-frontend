import agelgilAPI from "..";
import { IIngredient, INewIngredientFrom, IngredientUpdateFrom } from "../types/ingredient.type";

const ingredientApiSlice = agelgilAPI.injectEndpoints({
    endpoints: (builder) => ({
        getIngredientById: builder.query<IIngredient, string>({
            query: (ingredientsId) => `/public/ingredients/byId/${ingredientsId}`,
            transformResponse: (response: { body: IIngredient }) => response.body,
            providesTags: (result, _, ingredientsId) => result ? [{ type: 'Ingredient', id: ingredientsId }] : [],
        }),
        getIngredientByName: builder.query<IIngredient[], { nameType: "name" | "localName"; name: string }>({
            query: ({ nameType, name }) => `/public/ingredientByName/${nameType}/${name}`,
            transformResponse: (response: { body: IIngredient[] }) => response.body,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Ingredient' as const, id: _id })),
                        { type: 'Ingredient' as const, id: 'Ingredient' },
                    ]
                    : [{ type: 'Ingredient' as const, id: 'Ingredient' }],
        }),
        getIngredients: builder.query<IIngredient[], { skip: number; limit: number }>({
            query: ({ skip, limit }) => `/public/ingredients/list/${skip}/${limit}`,
            transformResponse: (response: { body: IIngredient[] }) => response.body,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Ingredient' as const, id: _id })),
                        { type: 'Ingredient' as const, id: 'Ingredient' },
                    ]
                    : [{ type: 'Ingredient' as const, id: 'Ingredient' }],
        }),
        getUniqueType: builder.query<string[], void>({
            query: () => `/public/ingredients/unique/type`,
            transformResponse: (response: { body: string[] }) => response.body,
            providesTags: ['Ingredient'],
        }),
        getUniqueName: builder.query<string[], void>({
            query: () => `/public/ingredients/unique/name`,
            transformResponse: (response: { body: string[] }) => response.body,
            providesTags: ['Ingredient'],
        }),
        getUniqueUnit: builder.query<string[], void>({
            query: () => `/public/ingredients/unique/unitOptions`,
            transformResponse: (response: { body: string[] }) => response.body,
            providesTags: ['Ingredient'],
        }),
        createIngredient: builder.mutation<IIngredient, INewIngredientFrom>({
            query: (newIngredient) => ({
                url: '/private/ingredients/',
                method: 'POST',
                body: newIngredient,
            }),
            invalidatesTags: [{ type: 'Ingredient', id: 'Ingredient' }],
        }),
        updateIngredient: builder.mutation<IIngredient, { ingredientsId: string; updates: IngredientUpdateFrom }>({
            query: ({ ingredientsId, updates }) => ({
                url: `/private/ingredients/${ingredientsId}`,
                method: 'PATCH',
                body: updates,
            }),
            invalidatesTags: (result, error, { ingredientsId }) => result ? [{ type: 'Ingredient', id: ingredientsId }] : [],
        }),
        removeIngredient: builder.mutation<void, string>({
            query: (ingredientsId) => ({
                url: `/private/ingredients/remove/id/${ingredientsId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, ingredientsId) => [{ type: 'Ingredient', id: ingredientsId }],
        }),
    }),
});

export const {
    useGetIngredientByIdQuery,
    useGetIngredientsQuery,
    useGetIngredientByNameQuery,
    useGetUniqueTypeQuery,
    useGetUniqueNameQuery,
    useCreateIngredientMutation,
    useUpdateIngredientMutation,
    useGetUniqueUnitQuery,
    useRemoveIngredientMutation,
} = ingredientApiSlice