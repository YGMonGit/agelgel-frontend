import agelgilAPI from "..";
import { IMealPlanner, INewMealPlanner, INutritionGoal } from "../types/mealPreference.type";
import { EPreferredMealTime, ERecipeStatus, IngredientDetail, INutritionData, IRecipe } from "../types/recipe.type";
const userApiSlice = agelgilAPI.injectEndpoints({
    endpoints: (builder) => ({

        createMealPlan: builder.mutation<IMealPlanner, { mealPlanData: INewMealPlanner }>({
            query: ({ mealPlanData }) => ({
                url: '/private/mealPlanner/createMealPlan',
                method: 'POST',
                body: mealPlanData,
            }),
            invalidatesTags: ['User-MealPlan'],
            transformResponse: (response: { body: IMealPlanner }) => response.body,
        }),

        getMealPlan: builder.query<{
        
                recipe: IRecipe[],
                nutrition: INutritionData;
                shoppingList: IngredientDetail[],
              
        }, { mealTime: EPreferredMealTime | 'all', page: number }>({
            query: ({ mealTime, page }) => ({
                url: `/private/mealPlanner/mealPlan/${mealTime}/${page}`,
                method: 'GET',
            }),
            transformResponse: (response: { body: any }) => response.body,
        }),

        addToMealPlan: builder.mutation<IMealPlanner, { mealTime: EPreferredMealTime, recipeID: string }>({
            query: ({ mealTime, recipeID }) => ({
                url: `/private/mealPlanner/addToMealPlan/${mealTime}/${recipeID}`,
                method: 'POST',
            }),
            transformResponse: (response: { body: IMealPlanner }) => response.body,
            invalidatesTags: (result, error, { mealTime }) => [{ type: 'MealPlan-Recipe', mealTime }],
        }),

        removeFromMealPlan: builder.mutation<IMealPlanner, { mealTime: EPreferredMealTime, recipeID: string }>({
            query: ({ mealTime, recipeID }) => ({
                url: `/private/mealPlanner/removeFromMealPlan/${mealTime}/${recipeID}`,
                method: 'DELETE',
            }),
            transformResponse: (response: { body: IMealPlanner }) => response.body,
            invalidatesTags: (result, error, { mealTime }) => [{ type: 'MealPlan-Recipe', mealTime }],
        }),

        resetMealPlanRecipes: builder.mutation<{}, void>({
            query: () => ({
                url: '/private/mealPlanner/reset/recipes',
                method: 'DELETE',
            }),
            invalidatesTags: ['MealPlan-Recipe'],
            transformResponse: (response: { body: {} }) => response.body,
        }),

        getNutritionGoal: builder.query<INutritionGoal, void>({
            query: () => ({
                url: '/private/mealPlanner/nutritionGoal',
                method: 'GET',
            }),
            transformResponse: (response: { body: INutritionGoal }) => response.body,
            providesTags: ['User-NutritionGoal'],
        }),

        updateStats: builder.mutation<IMealPlanner, { statsData: INewMealPlanner }>({
            query: ({ statsData }) => ({
                url: '/private/mealPlanner/updateStats',
                method: 'PATCH',
                body: statsData,
            }),
        }),

        getShoppingList: builder.query<IngredientDetail[], { mealTime: EPreferredMealTime }>({
            query: ({ mealTime }) => ({
                url: `/private/mealPlanner/shoppingList/${mealTime}`,
                method: 'GET',
            }),
            transformResponse: (response: { body: IngredientDetail[] }) => response.body,
            providesTags: ["shoppingList"],
        }),

        getSimilarRecipes: builder.query<IRecipe[], { mealTime: EPreferredMealTime | 'all', page: number }>({
            query: ({ mealTime, page }) => ({
                url: `/private/mealPlanner/similarRecipes/${mealTime}/${page}`,
                method: 'GET',
            }),
            providesTags: ['MealPlan-SimilarRecipe'],
            transformResponse: (response: { body: IRecipe[] }) => response.body,
        }),
    }),
});

export const {
    useCreateMealPlanMutation,
    useGetMealPlanQuery,
    useAddToMealPlanMutation,
    useRemoveFromMealPlanMutation,
    useResetMealPlanRecipesMutation,
    useGetNutritionGoalQuery,
    useUpdateStatsMutation,
    useGetShoppingListQuery,
    useGetSimilarRecipesQuery,
} = userApiSlice