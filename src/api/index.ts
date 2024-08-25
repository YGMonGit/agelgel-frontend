import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const appURL = import.meta.env.VITE_APP_URL;
const appURL = process.env.REACT_APP_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: appURL,
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        const token = localStorage.getItem('agelgilAuthorizationToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        const refreshToken = localStorage.getItem('agelgilRefreshToken');
        if (refreshToken) {
            const refreshResult = await baseQuery({
                url: '/private/user/refreshToken', // Update this with your refresh token endpoint
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('agelgilRefreshToken')}`
                }
            }, api, extraOptions);

            if (refreshResult?.meta?.response?.headers.get('RefreshToken')) {

                localStorage.setItem('agelgilAuthorizationToken', refreshResult?.meta?.response?.headers.get('Authorization')?.split("Bearer")[1].trim() ?? "");
                localStorage.setItem('agelgilRefreshToken', refreshResult?.meta?.response?.headers.get('RefreshToken')?.split("Bearer")[1].trim() ?? "");

            }

        }
    }

    return result;
};
export const agelgilAPI = createApi({
    reducerPath: 'agelgilAPI',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: ["User", "MyRecipe", "BookRecipe", "Recipe", "Recipe-SEARCH", "Recipe-LIST", "Ingredient", "Ingredient-LIST", "Review", "Review-LIST", "Moderator"]
})

export default agelgilAPI;