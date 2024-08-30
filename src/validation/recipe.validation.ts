import { z } from "zod";
import { EPreferredMealTime, EPreparationDifficulty } from "../api/types/recipe.type";
import { EAllergies, EChronicDisease, EDietaryPreferences } from "../api/types/user.type";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export const newRecipeSchema = z.object({
    cookingTime: z.string().min(1, "Cooking time is required"),
    description: z.string().min(1, "Description is required"),
    imgs: z.array(z.instanceof(File)).nonempty("At least one image is required")
        .refine((file: File[]) => file.every((f) => f.size <= MAX_FILE_SIZE), `Max image size is 5MB.`)
        .refine(
            (file: File[]) => file.every((f) => ACCEPTED_IMAGE_TYPES.includes(f.type)),
            "Only .jpg, .jpeg, .png, and .webp formats are supported."
        ),
    instructions: z.string().min(1, "Instructions are required"),
    name: z.string().min(1, "Recipe name is required"),
    preferredMealTime: z.array(z.nativeEnum(EPreferredMealTime)).nonempty(),
    ingredients: z.array(z.object({
        ingredient: z.string().min(1, "Ingredient is required"),
        name: z.string().min(1, "Ingredient name is required"),
        amount: z.number().nonnegative().min(1, "Amount must be a positive number"),
    })).nonempty("At least one ingredient is required"),
    youtubeLink: z.string().url().optional(),
    medical_condition: z.object({
        chronicDiseases: z.array(z.nativeEnum(EChronicDisease)).nonempty("At least one chronic disease is required"),
        dietary_preferences: z.array(z.nativeEnum(EDietaryPreferences)).nonempty("At least one dietary preference is required"),
        allergies: z.array(z.nativeEnum(EAllergies)).nonempty("At least one allergy is required"),
        // .refine((allergies) => !(allergies.length === 1 && allergies[0] === EAllergies.none), {
        //     message: 'Selecting only "none" is not allowed.',
        // }),
    }),
});

export const searchRecipeSchema = z.object({
    preferredMealTime: z.array(z.nativeEnum(EPreferredMealTime)).optional(),
    name: z.string().optional(),
    preparationDifficulty: z.nativeEnum(EPreparationDifficulty).optional(),
    cookingTime: z.number().int().min(0).optional(),
    ingredients: z.array(z.string().min(1)).optional(),
    sort: z.array(z.object({
        field: z.string().min(1),
        order: z.number().int().min(1).max(-1)
    })).optional(),
    // medical_condition: z.object({
    //     chronicDiseases: z.array(z.nativeEnum(EChronicDisease)).optional(),
    //     allergies: z.array(z.nativeEnum(EAllergies)).optional(),
    //     dietary_preferences: z.array(z.nativeEnum(EDietaryPreferences)).optional()
    // }).optional(),
    rating: z.number().int().min(0).max(5).positive().optional(),
});