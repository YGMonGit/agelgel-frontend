import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const appURL = import.meta.env.VITE_APP_URL;
const appURL = process.env.REACT_APP_URL;

export const agelgilAPI = createApi({
    reducerPath: 'agelgilAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: appURL,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            const token = localStorage.getItem('agelgilAuthorizationToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ["User", "Users", "MyRecipe", "BookRecipe", "Recipe", "Recipe-SEARCH", "Recipe-LIST",
        "Ingredient", "Ingredient-LIST", "Review", "Review-LIST", "Moderator", "User-MealPlan", "MealPlan-Recipe",
        "User-NutritionGoal", "shoppingList", "MealPlan-SimilarRecipe",
    ]
})

export default agelgilAPI;