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
}