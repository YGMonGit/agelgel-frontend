import React from 'react'
import { IoFastFood } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { RiInkBottleLine } from "react-icons/ri";

interface ModeratorNavProps {
  spaceType: string;
  setSpaceType: React.Dispatch<React.SetStateAction<string>>;
}

function ModeratorNav({spaceType, setSpaceType}: ModeratorNavProps) {
  return (
    <div className="w-full px-5 flex justify-between items-center text-slate-500 gap-2 select-none my-2">
      <button className={`px-5 flex-grow py-2 text-[1.5rem] ${spaceType === "recipe" && "text-content-color border-b-2 border-content-color"} flex justify-center items-center gap-2`} onClick={() => setSpaceType("recipe")}><IoFastFood /><p className={`text-[1.1rem] font-semibold`}>Recipes</p></button>
      <button className={`px-5 flex-grow py-2 text-[1.2rem] ${spaceType === "user" && "text-content-color border-b-2 border-content-color"} flex justify-center items-center gap-2`} onClick={() => setSpaceType("user")}><FaUser /><p className={`text-[1.1rem] font-semibold`}>Users</p></button>
      <button className={`px-5 flex-grow py-2 text-[1.4rem] ${spaceType === "ingredient" && "text-content-color border-b-2 border-content-color"} flex justify-center items-center gap-2`} onClick={() => setSpaceType("ingredient")}><RiInkBottleLine /><p className={`text-[1.1rem] font-semibold`}>Ingredients</p></button>
    </div>
  )
}

export default ModeratorNav;