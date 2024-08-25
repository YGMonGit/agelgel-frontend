import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const signUpSchema = z.object({
    email: z.string()
        .email({ message: "Please enter a valid email address." })
        .min(1, { message: "Email is required." }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .min(1, { message: "Password is required." }),
    confirm_password: z.string().min(1, { message: "Confirm password is required." }),
    first_name: z.string().min(1, { message: "first Name is required." }),
    last_name: z.string().min(1, { message: "last Name is required." }),
    phone_number: z.string().min(1, { message: "phone Number is required." }),
    profile_img: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
}).refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: "Passwords do not match.",
}).transform((obj) => ({
    ...obj,
    confirm_password: undefined,
}));

export const logInSchema = z.object({
    email: z.string()
        .email({ message: "Please enter a valid email address." })
        .min(1, { message: "Email is required." }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .min(1, { message: "Password is required." }),
});