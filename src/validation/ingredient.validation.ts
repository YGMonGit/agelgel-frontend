import { z } from "zod";

export const newIngredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  localName: z.string().min(1, "Local name is required"),
  type: z.string().min(1, "Ingredient type is required"),
  unit: z.array(z.string()).nonempty("At least one unit is required"),
});