import { z } from "zod";
import { EPreferredMealTime, EPreparationDifficulty } from "../api/types/recipe.type";
import { EAllergies, EChronicDisease, EDietaryPreferences } from "../api/types/user.type";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export const newRecipeSchema = z.object({
    cookingTime: z.number().nonnegative().min(1, "Cooking time must be a positive number"),
    description: z.string().min(1, "Description is required"),
    imgs: z
        .array(
            z
                .any()
                .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
                .refine(
                    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
                    "Only .jpg, .jpeg, .png, and .webp formats are supported."
                )
        ).nonempty("At least one image is required"),
    instructions: z.string().min(1, "Instructions are required"),
    name: z.string().min(1, "Recipe name is required"),
    preferredMealTime: z.array(z.nativeEnum(EPreferredMealTime)).nonempty(),
    preparationDifficulty: z.nativeEnum(EPreparationDifficulty),
    ingredients: z.array(z.object({
        ingredient: z.string().min(1, "Ingredient is required"),
        name: z.string().min(1, "Ingredient name is required"),
        amount: z.number().nonnegative().min(1, "Amount must be a positive number"),
    })).nonempty("At least one ingredient is required"),
    medical_condition: z.object({
        chronicDiseases: z.array(z.nativeEnum(EChronicDisease)).nonempty(),
        dietary_preferences: z.array(z.nativeEnum(EDietaryPreferences)).nonempty(),
        allergies: z.array(z.nativeEnum(EAllergies)).nonempty(),
    }),
    youtubeLink: z.string().url().optional(),
});