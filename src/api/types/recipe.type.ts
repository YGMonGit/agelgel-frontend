import { IIngredient } from "./ingredient.type";
import { IModerator } from "./moderator.type";
import { IReview } from "./review.type";
import { IMedicalCondition, IUser } from "./user.type";

export enum EPreferredMealTime {
    breakfast = "breakfast",
    lunch = "lunch",
    dinner = "dinner",
    snack = "snack",
    dessert = "dessert",
    other = "other",
}
export type TPreferredMealTime = "breakfast" | "lunch" | "dinner" | "snack" | "dessert" | "other";


export enum EPreparationDifficulty {
    easy = "easy",
    medium = "medium",
    hard = "hard",
}
export type TPreparationDifficulty = "easy" | "medium" | "hard";


export enum ERecipeStatus {
    verified = "verified",
    pending = "pending",
    rejected = "rejected",
}
export type TRecipeStatus = "verified" | "pending" | "rejected";
export interface IngredientDetail {
    ingredient: string | IIngredient;
    name: string;
    amount: number;
}

export interface IngredientDetailWithUnit {
    ingredient: string | IIngredient;
    name: string;
    amount: number;
    unit: string;
}

export interface IRecipe {
    _id: string;
    name: string;
    description?: string;
    imgs: string[];
    category: string;
    preferredMealTime: TPreferredMealTime[];
    preparationDifficulty: TPreparationDifficulty;
    cookingTime: number;
    ingredients: IngredientDetail[];
    instructions: string;
    youtubeLink?: string;

    rating: number;
    reviews: string[] | IReview[];
    totalReviews: number;


    status: TRecipeStatus;

    medical_condition: IMedicalCondition;

    nutrition: INutritionData;

    shareableLink: string;

    moderator?: {
        moderator: {
            moderator: string;
            full_name: string;
            profile_img: string;
        }
        Comment: string;
    };

    user: {
        user: string | IUser;
        full_name: string;
        profile_img: string;
    }

    hasBookedRecipe: boolean;


    createdAt: Date;
    updatedAt: Date;
}

export interface IRecipeCard {
    _id: string;
    name: string;
    description?: string;
    imgs: string[];
    preferredMealTime: TPreferredMealTime[];
    preparationDifficulty: TPreparationDifficulty;
    cookingTime: number;
    rating: number;

}

export interface INewRecipeFrom {
    name: string;
    description?: string;
    imgs: string[];
    preferredMealTime: EPreferredMealTime[];
    preparationDifficulty: TPreparationDifficulty;
    cookingTime: string;
    ingredients: IngredientDetail[];
    instructions: string;
    medical_condition: IMedicalCondition;
    youtubeLink?: string;
}

export interface IRecipeUpdateFrom extends Partial<INewRecipeFrom> {
}

export interface IRecipeSearchFrom {
    preferredMealTime?: TPreferredMealTime[];
    name?: string;
    preparationDifficulty?: TPreparationDifficulty;
    cookingTime?: number;
    ingredients: string[]
    sort?: { field: string, order: 1 | -1 }[];
    medical_condition?: IMedicalCondition;
    status?: TRecipeStatus;
    rating?: number;
}

export interface INutritionData {
    sugar_g: number
    fiber_g: number
    serving_size_g: number
    sodium_mg: number
    name: string
    potassium_mg: number
    fat_saturated_g: number
    fat_total_g: number
    calories: number
    cholesterol_mg: number
    protein_g: number
    carbohydrates_total_g: number
}
