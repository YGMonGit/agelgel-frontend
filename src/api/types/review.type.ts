import { IRecipe } from "./recipe.type";
import { IUser } from "./user.type";

export interface IReview {
    _id: string;
    user: {
        user: string | IUser;
        full_name: string;
        profile_img: string;
    },
    recipe: string | IRecipe;
    comment: string;
    rating: number;
}

export interface INewReviewFrom {
    recipe: string;
    comment: string;
    rating: number;
}

export interface IReviewUpdateFrom extends Partial<INewReviewFrom> {
}


