import agelgilAPI from "..";
import { INewReviewFrom, IReview, IReviewUpdateFrom } from "../types/review.type";

const reviewApiSlice = agelgilAPI.injectEndpoints({
    endpoints: (builder) => ({
        getReviewById: builder.query<IReview, string>({
            query: (reviewId) => `/public/review/${reviewId}`,
            transformResponse: (response: { body: IReview }) => response.body,
            providesTags: (result, _, reviewId) => result ? [{ type: 'Review', id: reviewId }] : [],
        }),
        getRecipeReviews: builder.query<IReview[], { recipeId: string; skip: number; limit: number }>({
            query: ({ recipeId, skip, limit }) => `/public/review/recipe/${recipeId}/${skip}/${limit}`,
            transformResponse: (response: { body: IReview[] }) => response.body,
            providesTags: (result, _, { recipeId }) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Review' as const, id: _id })),
                        { type: 'Review' as const, id: recipeId },
                    ]
                    : [{ type: 'Review' as const, id: recipeId }],
        }),
        createReview: builder.mutation<IReview, INewReviewFrom>({
            query: (newReview) => ({
                url: '/private/review/create',
                method: 'POST',
                body: newReview,
            }),
            invalidatesTags: (result) => result ? [{ type: 'Review', id: result._id }] : [],
        }),
        // updateReview: builder.mutation<IReview, { reviewId: string; updates: IReviewUpdateFrom }>({
        //     query: ({ reviewId, updates }) => ({
        //         url: `/private/review/${reviewId}`,
        //         method: 'PATCH',
        //         body: updates,
        //     }),
        //     invalidatesTags: (result, error, { reviewId }) => result ? [{ type: 'Review', id: reviewId }] : [],
        // }),
    }),
});

export const {
    useGetReviewByIdQuery,
    useGetRecipeReviewsQuery,
    useCreateReviewMutation,
    // useUpdateReviewMutation,
} = reviewApiSlice