import { IReview } from "./review.type";
import { IUser } from "./user.type";

export enum EPreferredMealTime {
    breakfast = "breakfast",
    lunch = "lunch",
    dinner = "dinner",
    snack = "snack",
    dessert = "dessert",
    drink = "drink",
    other = "other",
}
export type TPreferredMealTime = "breakfast" | "lunch" | "dinner" | "snack" | "dessert" | "drink" | "other";


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
interface IngredientDetail {
    // ingredient: string | IIngredient;
    amount: number;
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

    rating: number;
    reviews: string[] | IReview[];

    status: TRecipeStatus;
    moderator?: {
        // moderator: string | IModerator;
        Comment: string;
    };

    user: {
        user: string | IUser;
        full_name: string;
        profile_img: string;
    }
}

export interface INewRecipeFrom {
    name: string;
    description?: string;
    imgs: string[];
    preferredMealTime: TPreferredMealTime[];
    preparationDifficulty: TPreparationDifficulty;
    cookingTime: number;
    ingredients: IngredientDetail[];
    instructions: string;
}

export interface IRecipeUpdateFrom extends Partial<INewRecipeFrom> {
}

export interface IRecipeSearchFrom {
    preferredMealTime?: TPreferredMealTime[];
    name?: string;
    preparationDifficulty?: TPreparationDifficulty;
    cookingTime?: number;
    ingredients: string[]
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
