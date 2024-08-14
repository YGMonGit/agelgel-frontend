import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import NewRecipeFormOne from "./sub_pages/NewRecipeFormOne";
import NewRecipeFormTwo from "./sub_pages/NewRecipeFormTwo";
import NewRecipeFormThree from "./sub_pages/NewRecipeFormThree";

function NewRecipeForm() {
  // Form navigator state
  const [formNumber, setFormNumber] = useState(1);


  // For form one
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [mealTime, setMealTime] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [time, setTime] = useState("");
  
  // For form two
  const [ingredientList, setIngredientList] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    // Handle form submission logic here
    console.log("Hello");
    
  }

  // For form three
  const [instructions, setInstructions] = useState("");

  return (
    <div className="w-full flex-grow flex flex-col justify-start items-center mb-6">
      <PageHeader
        header="Add a New Recipe"
        detail="Thanks for contributing to our database of recipes!"
      />
      {formNumber !== 1 ? formNumber === 2 ? (
        <NewRecipeFormTwo
          setFormNumber={setFormNumber}
          ingredientList={ingredientList}
          setIngredientList={setIngredientList}
        />
      ) : (
        <NewRecipeFormThree
          setFormNumber={setFormNumber}
          ingredientList={ingredientList}
          setIngredientList={setIngredientList}
          instructions={instructions}
          setInstructions={setInstructions}
          handleSubmit={handleSubmit}
        />
      ) : (
        <NewRecipeFormOne
          setFormNumber={setFormNumber}
          recipeName={recipeName}
          setRecipeName={setRecipeName}
          description={description}
          setDescription={setDescription}
          mealTime={mealTime}
          setMealTime={setMealTime}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          time={time}
          setTime={setTime}
        />
      )}
    </div>
  );
}

export default NewRecipeForm;