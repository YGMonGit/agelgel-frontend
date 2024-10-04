import { IReview } from "./review.type";
import { IUser } from "./user.type";

export interface INotification {
    _id: string;
    user: IUser;
    isRead: boolean;
    review: {
        review: IReview;
        rating: number;
        comment: string;
    };
}