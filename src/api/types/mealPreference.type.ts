import { EPreferredMealTime, IngredientDetail, INutritionData, IRecipe } from "./recipe.type";
import { IUser } from "./user.type";

export enum EDietGoals {
  weight_loss = "weight_loss",
  weight_gain = "weight_gain",
  muscle_gain = "muscle_gain",
  maintain_weight = "maintain_weight",
  none = "none",
}

export type TDietGoals = "weight_loss" | "weight_gain" | "muscle_gain" | "maintain_weight" | "none";

export enum EGender {
  // label="gender",
  male = "male",
  female = "female"
}

export type tGender = "male" | "female"

export enum EActivityLevel {
  sedentary = "sedentary",
  light = "light",
  moderate = "moderate",
  active = "active",
  veryActive = "veryActive"
}

export type TActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryActive"

export interface INutritionGoal {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface IUserStats {
  weights: {
    date: Date;
    value: number;
  };
  weight: number;
  height: number;
  age: number;
  gender: EGender;
  activityLevel: EActivityLevel
  diet_goals: EDietGoals;
  bestWeigh: {
    min: number,
    max: number
  }
}

export interface IMealPlanner {
  nutritionGoal: INutritionGoal,
  currentNutrition: INutritionGoal,
  user: string | IUser,
  userStats?: IUserStats,
  recipes: {
    recipe: string | IRecipe,
    mealTime: EPreferredMealTime,
  }[],
  nutrition: INutritionData;
  shoppingList: IngredientDetail[],
}

export interface INewMealPlanner {
  weight: number;
  height: number;
  age: number
  gender: EGender;
  activityLevel: EActivityLevel
  diet_goals: EDietGoals;
}

export interface IMealPlannerUpdateFrom extends Partial<INewMealPlanner> { }