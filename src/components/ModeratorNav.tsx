import React from 'react'
import RecipeIcon from "../assets/icons/recipe-icon.png";
import UserIcon from "../assets/icons/user-icon.png";
import IngredientIcon from "../assets/icons/ingredient-icon.png";

interface ModeratorNavProps {
  spaceType: string;
  setSpaceType: React.Dispatch<React.SetStateAction<string>>;
}

function ModeratorNav({spaceType, setSpaceType}: ModeratorNavProps) {
  const getButtonClasses = (type: string) => {
    return "px-2 py-2 flex justify-center items-center gap-2";
  };

  const getTextClasses = (type: string) => {
    return `text-[1rem] px-1 font-semibold ${spaceType === type ? "text-content-color" : ""} relative inline-block`;
  };

  const getUnderlineClasses = (type: string) => {
    return spaceType === type ? "absolute -bottom-2 left-0 right-0 h-1.5 bg-content-color rounded-full" : "";
  };

  return (
    <div className="w-full fixed mt-16 bg-white top-0 px-5 flex justify-between items-center gap-2 select-none my-2">
      <button 
        className={getButtonClasses("recipe")} 
        onClick={() => setSpaceType("recipe")}
      >
        <img src={RecipeIcon} className="w-[16px]" alt="Recipe" />
        <p className={getTextClasses("recipe")}>
          Recipes
          <span className={getUnderlineClasses("recipe")}></span>
        </p>
      </button>
      <button 
        className={getButtonClasses("user")} 
        onClick={() => setSpaceType("user")}
      >
        <img src={UserIcon} className="w-[16px]" alt="User" />
        <p className={getTextClasses("user")}>
          Users
          <span className={getUnderlineClasses("user")}></span>
        </p>
      </button>
      <button 
        className={getButtonClasses("ingredient")} 
        onClick={() => setSpaceType("ingredient")}
      >
        <img src={IngredientIcon} className="w-[16px]" alt="Ingredient" />
        <p className={getTextClasses("ingredient")}>
          Ingredients
          <span className={getUnderlineClasses("ingredient")}></span>
        </p>
      </button>
    </div>
  )
}

export default ModeratorNav;