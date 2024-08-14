
export enum EStatus {
    active = "active",
    disabled = "disabled",
    blocked = "blocked",
}

export type TStatus = "active" | "disabled" | "blocked";

export interface IUser {
    profile_img?: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    full_name: string;
    phone_number: string;
    status: TStatus;

    booked_recipes: IRecipe[];
    my_recipes: IRecipe[];
}


export interface IUserLogInFrom {
    email: string;
    password: string;
}

export interface IUserSignUpFrom {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    profile_img?: string;
}
