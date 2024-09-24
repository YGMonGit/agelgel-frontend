// Temp imports
import image1 from "./images/post/image_1.png";
import image2 from "./images/post/image_2.png";
import image3 from "./images/post/image_3.png";
import image4 from "./images/post/image_4.png";
import user1 from "./images/post/user_1.png";

// Url prefix
export const domainUrl = "http://localhost:3000";

// Page urls
export const homeUrl = "/user/home";
export const searchUrl = "/user/search";
export const loginUrl = "/user/login";
export const signUpUrl = "/user/sign-up";
export const editUserInfoUrl = "/user/edit-info";
export const recipeDetailUrl = "/user/recipe-detail";
export const postUrl = "/user/post";
export const editPostUrl = "/user/edit-post";
export const mySpaceUrl = "/user/my-space";
export const welcomeUrl = "/user";
export const personalDataUrl = "/user/personal-data";
export const mealPlannerUrl = "/user/meal-planner";
export const updateHealthConditionUrl = "/user/update-health-condition";
export const editPersonalDataUrl = "/user/edit-personal-data";
export const notificationsUrl = "/user/notifications";

export const moderatorSignUpUrl = "/moderator/sign-up";
export const moderatorLoginUrl = "/moderator/login";
export const moderatorHomeUrl = "/moderator/home";
export const moderatorSearchUrl = "/moderator/search";
export const moderatorRecipeDetailUrl = "/moderator/recipe-detail";
export const moderatorSpaceUrl = "/moderator/space";
export const moderatorAddIngredientUrl = "/moderator/add-ingredient";
export const moderatorEditIngredientUrl = "/moderator/edit-ingredient";
export const moderatorEditInfoUrl = "/moderator/edit-info";
export const moderatorWelcomeUrl = "/moderator";


export const allergies = [
  "Peanuts",
  "Gluten",
  "Dairy",
  "Soy",
  "Shellfish",
  "Eggs",
  "Tree Nuts",
  "Wheat",
  "Fish",
  "Sesame"
];

export const healthIssue = [
  "Diabetes",
  "Lactose Intolerance",
];

export const mealPreferences = [
  "Red Meat",
  "Injera",
  "Chicken",
  "Pork",
  "Seafood",
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Gluten-Free",
  "Dairy-Free",
  "Low-Carb"
];

export const filterData = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snacks",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
];


// Temp data

export const posts = [
  {
    id: 1,
    imageUrl: image1,
    title: "Meal Suggestion #1",
    subtitle: "Lorem ipsum dolor emet.",
    star: 5,
    detail: "Lorem ipsum dolor sit amet consectetur. Parturient apsum dolor sit amet consectetured. Parturient null lorem ipsum dolor sit amet consectetur. turient.",
    type: "Breakfast",
    time: "32 min",
    difficulty: "Medium",
    macroNutrients: ["350Kcal", "25g of Protein", "15g of Carbs", "8g of Fat"],
    ingredients: ["Injera, 120gm", "Wine, 200ml", "Dulet, 250gm"]
  },
  {
    id: 2,
    imageUrl: image2,
    title: "Meal Suggestion #2",
    subtitle: "Lorem ipsum dolor emet.",
    star: 5,
    detail: "Lorem ipsum dolor sit amet consectetur. Parturient apsum dolor sit amet consectetured. Parturient null lorem ipsum dolor sit amet consectetur. turient.",
    type: "Lunch",
    time: "20 min",
    difficulty: "Easy",
    macroNutrients: ["350Kcal", "25g of Protein", "15g of Carbs", "8g of Fat"],
    ingredients: ["Injera, 120gm", "Wine, 200ml", "Dulet, 250gm"]
  },
  {
    id: 3,
    imageUrl: image3,
    title: "Meal Suggestion #3",
    subtitle: "Lorem ipsum dolor emet.",
    star: 5,
    detail: "Lorem ipsum dolor sit amet consectetur. Parturient apsum dolor sit amet consectetured. Parturient null lorem ipsum dolor sit amet consectetur. turient.",
    type: "Dinner",
    time: "45 min",
    difficulty: "Hard",
    macroNutrients: ["350Kcal", "25g of Protein", "15g of Carbs", "8g of Fat"],
    ingredients: ["Injera, 120gm", "Wine, 200ml", "Dulet, 250gm"]
  },
  {
    id: 4,
    imageUrl: image4,
    title: "Meal Suggestion #4",
    subtitle: "Lorem ipsum dolor emet.",
    star: 5,
    detail: "Lorem ipsum dolor sit amet consectetur. Parturient apsum dolor sit amet consectetured. Parturient null lorem ipsum dolor sit amet consectetur. turient.",
    type: "Snack",
    time: "10 min",
    difficulty: "Easy",
    macroNutrients: ["350Kcal", "25g of Protein", "15g of Carbs", "8g of Fat"],
    ingredients: ["Injera, 120gm", "Wine, 200ml", "Dulet, 250gm"]
  },
  {
    id: 5,
    imageUrl: image4,
    title: "Meal Suggestion #4",
    subtitle: "Lorem ipsum dolor emet.",
    star: 5,
    detail: "Lorem ipsum dolor sit amet consectetur. Parturient apsum dolor sit amet consectetured. Parturient null lorem ipsum dolor sit amet consectetur. turient.",
    type: "Snack",
    time: "10 min",
    difficulty: "Easy",
    macroNutrients: ["350Kcal", "25g of Protein", "15g of Carbs", "8g of Fat"],
    ingredients: ["Injera, 120gm", "Wine, 200ml", "Dulet, 250gm"]
  },
];

export const comment = {
  imageUrl: user1,
  name: "Micheal Gough",
  postTime: "2 days ago",
  content: "Lorem ipsum dolor sit amet consectetur. Cursus interdum fermentum malesuada erat metus viverra velit in quam."
};

export function getProteinColor(protein: number): string {
  // Ensure the input is within the range 0 to 1000
  if (protein < 0) protein = 0;
  if (protein > 1000) protein = 1000;

  let r, g, b;

  if (protein <= 500) {
    // Transition from Light Blue (#ADD8E6) to Blue (#0000FF)
    const ratio = protein / 500; // Ratio between 0 and 500 protein
    r = Math.round(173 + (0 - 173) * ratio);  // Red decreases from 173 to 0
    g = Math.round(216 + (0 - 216) * ratio);  // Green decreases from 216 to 0
    b = Math.round(230 + (255 - 230) * ratio); // Blue increases from 230 to 255
  } else {
    // Transition from Blue (#0000FF) to Deep Blue (#00008B)
    const ratio = (protein - 500) / 500; // Ratio between 500 and 1000 protein
    r = 0; // Red stays 0
    g = Math.round(0 + (0 - 0) * ratio);   // Green stays 0
    b = Math.round(255 + (139 - 255) * ratio); // Blue decreases from 255 to 139
  }

  // Convert RGB to Hex
  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

  return hex;
}

export function getCalorieColor(calorie: number) {
  // Ensure the input is within the range 0 to 1000
  if (calorie < 0) calorie = 0;
  if (calorie > 1000) calorie = 1000;

  let r, g, b;

  if (calorie <= 500) {
    // Transition from Orange (#FFA500) to Tomato Red (#FF6347)
    const ratio = calorie / 500; // Ratio between 0 and 500 calories
    r = Math.round(255 + (255 - 255) * ratio); // Red stays at 255
    g = Math.round(165 + (99 - 165) * ratio);  // Green decreases from 165 to 99
    b = Math.round(0 + (71 - 0) * ratio);      // Blue increases from 0 to 71
  } else {
    // Transition from Tomato Red (#FF6347) to Golden Yellow (#FFD700)
    const ratio = (calorie - 500) / 500; // Ratio between 500 and 1000 calories
    r = 255; // Red stays 255
    g = Math.round(99 + (215 - 99) * ratio);  // Green increases from 99 to 215
    b = Math.round(71 + (0 - 71) * ratio);    // Blue decreases from 71 to 0
  }

  // Convert RGB to Hex
  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

  return hex;
}

export function getFatColor(fat: number): string {
  // Ensure the input is within the range 0 to 1000
  if (fat < 0) fat = 0;
  if (fat > 1000) fat = 1000;

  let r, g, b;

  if (fat <= 500) {
    // Transition from Dark Yellow (#F5DEB3) to Dark Gold (#DAA520)
    const ratio = fat / 500;
    r = Math.round(245 + (218 - 245) * ratio); // Red decreases from 245 to 218
    g = Math.round(222 + (165 - 222) * ratio); // Green decreases from 222 to 165
    b = Math.round(179 + (32 - 179) * ratio);  // Blue decreases from 179 to 32
  } else {
    // Transition from Dark Gold (#DAA520) to Saddle Brown (#8B4513)
    const ratio = (fat - 500) / 500;
    r = Math.round(218 + (139 - 218) * ratio); // Red decreases from 218 to 139
    g = Math.round(165 + (69 - 165) * ratio);  // Green decreases from 165 to 69
    b = Math.round(32 + (19 - 32) * ratio);    // Blue decreases from 32 to 19
  }

  // Convert RGB to Hex
  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

  return hex;
}

export function getCarbsColor(carbs: number) {
  // Ensure the input is within the range 0 to 1000
  if (carbs < 0) carbs = 0;
  if (carbs > 1000) carbs = 1000;

  let r, g, b;

  if (carbs <= 500) {
    // Transition from Light Green (#90EE90) to Lime Green (#32CD32)
    const ratio = carbs / 500;
    r = Math.round(144 + (50 - 144) * ratio);  // Red decreases from 144 to 50
    g = Math.round(238 + (205 - 238) * ratio); // Green decreases from 238 to 205
    b = Math.round(144 + (50 - 144) * ratio);  // Blue decreases from 144 to 50
  } else {
    // Transition from Lime Green (#32CD32) to Dark Green (#006400)
    const ratio = (carbs - 500) / 500;
    r = Math.round(50 + (0 - 50) * ratio);  // Red decreases from 50 to 0
    g = Math.round(205 + (100 - 205) * ratio); // Green decreases from 205 to 100
    b = Math.round(50 + (0 - 50) * ratio);  // Blue decreases from 50 to 0
  }

  // Convert RGB to Hex
  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

  return hex;
}

export function getFiberColor(fiber: number) {
  // Ensure the input is within the range 0 to 1000
  if (fiber < 0) fiber = 0;
  if (fiber > 1000) fiber = 1000;

  let r, g, b;

  if (fiber <= 500) {
    // Transition from Light Coral (#F08080) to Crimson (#DC143C)
    const ratio = fiber / 500;
    r = Math.round(240 + (220 - 240) * ratio); // Red decreases from 240 to 220
    g = Math.round(128 + (20 - 128) * ratio);  // Green decreases from 128 to 20
    b = Math.round(128 + (60 - 128) * ratio);  // Blue decreases from 128 to 60
  } else {
    // Transition from Crimson (#DC143C) to Maroon (#800000)
    const ratio = (fiber - 500) / 500;
    r = Math.round(220 + (128 - 220) * ratio); // Red decreases from 220 to 128
    g = Math.round(20 + (0 - 20) * ratio);     // Green decreases from 20 to 0
    b = Math.round(60 + (0 - 60) * ratio);     // Blue decreases from 60 to 0
  }

  // Convert RGB to Hex
  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

  return hex;
}


//temporary dummy data
export const notifications = [
  {
    status: "verified",
    title: "Its a great recipe",
    message: "Very great way of showing how the meal is made!",
    seen: false,
  },
  {
    status: "rejected",
    title: "Its a mess",
    message: "A lot of mistakes exist in your work",
    seen: false,
  },
  {
    status: "verified",
    title: "Its a great recipe",
    message: "Very great way of showing how the meal is made! keep it up",
    seen: true,
  },
];