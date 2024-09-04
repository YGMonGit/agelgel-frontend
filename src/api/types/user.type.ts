import { IRecipe } from "./recipe.type";

export enum EStatus {
    active = "active",
    disabled = "disabled",
    blocked = "blocked",
}
export enum EVerified {
    pending = "pending",
    verified = "verified",
}

export type TStatus = "active" | "disabled" | "blocked";

export type TChronicDisease = "diabetes" | "hypertension" | "obesity" | "heart_disease" | "kidney_disease" | "liver_disease" | "other" | "none";

export enum EChronicDisease {
    diabetes = "diabetes",
    hypertension = "hypertension",
    obesity = "obesity",
    heart_disease = "heart_disease",
    kidney_disease = "kidney_disease",
    liver_disease = "liver_disease",
    other = "other",
    none = "none",
}

export enum EDietaryPreferences {
    vegetarian = "vegetarian",
    vegan = "vegan",
    gluten_free = "gluten_free",
    dairy_free = "dairy_free",
    nut_free = "nut_free",
    LowSugar = "LowSugar",
    other = "other",
    none = "none",
}

export type TDietaryPreferences = "vegetarian" | "vegan" | "gluten_free" | "dairy_free" | "nut_free" | "LowSugar" | "other" | "none";

export enum EAllergies {
    peanuts = "peanuts",
    tree_nuts = "tree_nuts",
    shellfish = "shellfish",
    dairy = "dairy",
    eggs = "eggs",
    wheat = "wheat",
    soy = "soy",
    fish = "fish",
    other = "other",
    none = "none",
}

export type TAllergies = "peanuts" | "tree_nuts" | "shellfish" | "dairy" | "eggs" | "wheat" | "soy" | "fish" | "other" | "none";


export interface IMedicalCondition {
    chronicDiseases: EChronicDisease[];
    dietary_preferences: EDietaryPreferences[];
    allergies: EAllergies[];
}

export interface IUser {
    _id: string;
    profile_img?: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    full_name: string;
    phone_number: string;
    status: TStatus;
    verified: EVerified;

    medical_condition: IMedicalCondition;


    booked_recipes: string[] | IRecipe[];
    my_recipes: string | IRecipe[];
}


export interface IUserLogInFrom {
    email: string;
    password: string;
}

export interface IUserSignUpFrom {
    email: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    profile_img?: string;

    medical_condition: IMedicalCondition;

}

export interface IUserUpdateFrom extends Partial<IUserSignUpFrom> {
}

export interface IModeratorUserUpdateSchema {
    verified?: boolean;
    status?: EStatus;
}

