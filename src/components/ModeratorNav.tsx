import React from 'react'

interface ModeratorNavProps {
  spaceType: string;
  setSpaceType: React.Dispatch<React.SetStateAction<string>>;
}

function ModeratorNav({spaceType, setSpaceType}: ModeratorNavProps) {
  return (
    <div className="w-full px-5 flex justify-between items-center text-[1.2rem] text-slate-500 gap-2 select-none mt-2">
      <button className={`px-5 py-4 ${spaceType === "recipe" && "text-content-color border-b-2 border-content-color"}`} onClick={() => setSpaceType("recipe")}>Recipes</button>
      <button className={`px-5 py-4 ${spaceType === "user" && "text-content-color border-b-2 border-content-color"}`} onClick={() => setSpaceType("user")}>Users</button>
      <button className={`px-5 py-4 ${spaceType === "ingredient" && "text-content-color border-b-2 border-content-color"}`} onClick={() => setSpaceType("ingredient")}>Ingredients</button>
    </div>
  )
}

export default ModeratorNav;