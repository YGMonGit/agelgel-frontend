import { ERecipeStatus, IRecipe, TRecipeStatus } from "./recipe.type";

export enum EStatus {
    active = "active",
    disabled = "disabled",
    blocked = "blocked",
}

export type TStatus = "active" | "disabled" | "blocked";

export interface IModerator {
    _id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    full_name: string;
    phone_number: string;
    status: TStatus;
    bio: string;
    profile_img?: string;

    moderated_recipe: {
        recipe: string | IRecipe,
        comment: string,
        status: ERecipeStatus,
    }[];

}

export interface IModeratorLogInFrom {
    email: string;
    password: string;
}

export interface IModeratorSignUpFrom {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    bio: string;
    profile_img?: string;
}

export interface IModeratorUpdateFrom extends Partial<IModeratorSignUpFrom> {
}

export interface IModeratorRecipeUpdateFrom {
    status: TRecipeStatus;
    Comment: string;
}


