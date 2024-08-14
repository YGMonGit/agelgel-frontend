// Temp imports
import image1 from "./images/post/image_1.png"; 
import image2 from "./images/post/image_2.png"; 
import image3 from "./images/post/image_3.png"; 
import image4 from "./images/post/image_4.png"; 
import user1 from "./images/post/user_1.png"; 

// Url prefix
export const domainUrl = "http://localhost:3000";

// Page urls
export const homeUrl = "/";
export const loginUrl = "/login";
export const signUpUrl = "/sign-up";
export const recipeDetailUrl = "/recipe-detail";
export const postUrl = "/post";

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
    ingredients: ["Injera, 120gm","Wine, 200ml", "Dulet, 250gm" ]
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
    ingredients: ["Injera, 120gm","Wine, 200ml", "Dulet, 250gm" ]
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
    ingredients: ["Injera, 120gm","Wine, 200ml", "Dulet, 250gm" ]
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
    ingredients: ["Injera, 120gm","Wine, 200ml", "Dulet, 250gm" ]
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
    ingredients: ["Injera, 120gm","Wine, 200ml", "Dulet, 250gm"]
  },
];

export const comment = {
  imageUrl: user1,
  name: "Micheal Gough",
  postTime: "2 days ago",
  content: "Lorem ipsum dolor sit amet consectetur. Cursus interdum fermentum malesuada erat metus viverra velit in quam."
};