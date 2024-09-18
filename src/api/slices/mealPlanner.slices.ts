import agelgilAPI from "..";
import { IMealPlanner, IMealPlannerUpdateFrom, INewMealPlanner, INutritionGoal } from "../types/mealPreference.type";
import { EPreferredMealTime, ERecipeStatus, IngredientDetail, INutritionData, IRecipe } from "../types/recipe.type";
const mealPlannerApiSlice = agelgilAPI.injectEndpoints({
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

        myMealPlan: builder.query<IMealPlanner, void>({
            query: () => ({
                url: '/private/mealPlanner/myMealPlan',
                method: 'GET',
            }),
            providesTags: ['User-MealPlan'],
            transformResponse: (response: { body: IMealPlanner }) => response.body,
        }),

        getMealPlan: builder.query<{ recipe: IRecipe; nutrition: INutritionData }[], { mealTime: EPreferredMealTime | 'all', page: number }>({
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
            invalidatesTags: (result, error, { recipeID, mealTime }) => result ? [
                { type: "checkIfUserRecipeExists" },
                { type: 'MealPlan-Recipe', id: mealTime }
            ] : [],
        }),

        removeFromMealPlan: builder.mutation<IMealPlanner, { recipeID: string }>({
            query: ({ recipeID }) => ({
                url: `/private/mealPlanner/removeFromMealPlan/${recipeID}`,
                method: 'DELETE',
            }),
            transformResponse: (response: { body: IMealPlanner }) => response.body,
            invalidatesTags: (result, error, { recipeID }) => result ? [
                { type: "checkIfUserRecipeExists" }
            ] : [],
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

        updateStats: builder.mutation<IMealPlanner, { statsData: IMealPlannerUpdateFrom }>({
            query: ({ statsData }) => ({
                url: '/private/mealPlanner/updateStats',
                method: 'PATCH',
                body: statsData,
            }),
        }),

        getShoppingList: builder.query<IngredientDetail[], void>({
            query: () => ({
                url: `/private/mealPlanner/shoppingList}`,
                method: 'GET',
            }),
            transformResponse: (response: { body: IngredientDetail[] }) => response.body,
            providesTags: ["shoppingList"],
        }),

        getSimilarRecipes: builder.query<IRecipe[], { mealTime: EPreferredMealTime | 'all', page: number }>({
            query: ({ mealTime, page }) => ({
                url: `/private/mealPlanner/similarRecipes/${mealTime.toString()}/${page}`,
                method: 'GET',
            }),
            providesTags: ['MealPlan-SimilarRecipe'],
            transformResponse: (response: { body: IRecipe[] }) => response.body,
        }),

        checkIfUserRecipeExists: builder.query<{ isRecipeInMealPlan: boolean }, { recipeID: string }>({
            query: ({ recipeID }) => ({
                url: `/private/mealPlanner/checkIfUserRecipe/${recipeID}`,
                method: 'GET',
            }),
            providesTags: ['checkIfUserRecipeExists'],
            transformResponse: (response: { body: { isRecipeInMealPlan: boolean } }) => response.body,
        }),
    }),
});

export const {
    useCreateMealPlanMutation,
    useMyMealPlanQuery,
    useGetMealPlanQuery,
    useAddToMealPlanMutation,
    useRemoveFromMealPlanMutation,
    useResetMealPlanRecipesMutation,
    useGetNutritionGoalQuery,
    useUpdateStatsMutation,
    useGetShoppingListQuery,
    useGetSimilarRecipesQuery,
    useCheckIfUserRecipeExistsQuery,
} = mealPlannerApiSlice