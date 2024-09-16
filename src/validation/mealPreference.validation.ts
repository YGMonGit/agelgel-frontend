import { z } from "zod";
import { EActivityLevel, EDietGoals, EGender } from "../api/types/mealPreference.type";

// export const AddMealPreferenceSchema = z.object({
//   weight: z.number().min(1, "Weight can not be negative"),
//   height: z.number().min(1, "Height can not be negative"),
//   age: z.number().int().min(1, "Age can not be below zero").max(110, "Age can not be this high").optional(),
//   gender: z.string(z.nativeEnum(EGender)),
//   active_level: z.string(z.nativeEnum(EActivityLevel)),
//   diet_goals: z.string(z.nativeEnum(EDietGoals)),
// });

export const AddMealPreferenceSchema = z.object({
  weight: z.number().min(1, "Weight must be greater than 0").refine((value) => !isNaN(value), "Weight is required"),
  height: z.number().min(1, "Height must be greater than 0").refine((value) => !isNaN(value), "Height is required"),
  age: z.number().int().min(1, "Age must be greater than 0").max(110, "Age cannot be this high"),
  gender: z.nativeEnum(EGender, { required_error: "Gender is required" }),
  active_level: z.nativeEnum(EActivityLevel, { required_error: "Activity level is required" }),
  diet_goals: z.nativeEnum(EDietGoals, { required_error: "Diet goal is required" }),
});