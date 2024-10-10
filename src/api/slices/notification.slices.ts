import agelgilAPI from "..";
import { INotification, } from "../types/notification.type";

const notificationApiSlice = agelgilAPI.injectEndpoints({
    endpoints: (builder) => ({

        getNotificationById: builder.query<INotification, string>({
            query: (id) => `/public/notification/${id}`,
            providesTags: (result, _, id) => result ? [{ type: 'Notification', id }] : [],
            transformResponse: (response: { body: INotification }) => response.body,
        }),
        getMyNotification: builder.query<INotification[], { skip: number; limit: number }>({
            query: ({ skip, limit }) => `/private/notification/user/${skip}/${limit}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((notification) => ({ type: 'Notification' as const, id: notification._id })),
                        { type: 'Notification' as const, id: 'Notification-LIST' },
                    ]
                    : [{ type: 'Notification' as const, id: 'Notification-LIST' }],
            transformResponse: (response: { body: INotification[] }) => response.body,
        }),
        getMyNotificationCount: builder.query<number, void>({
            query: () => '/private/notification/user/count',
            transformResponse: (response: { body: number }) => response.body,
        }),
        markAsRead: builder.mutation<INotification, { id: string }>({
            query: ({ id }) => ({
                url: `/private/notification/markAsRead/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: (result, _, { id }) => result ? [{ type: 'Notification', id }] : [],
            transformResponse: (response: { body: INotification }) => response.body,
        }),

    }),
});

export const {
    useGetNotificationByIdQuery,
    useGetMyNotificationQuery,
    useGetMyNotificationCountQuery,
    useMarkAsReadMutation
} = notificationApiSlice