import React from "react";

interface MySpaceNavProps {
  spaceType: boolean;
  setSpaceType: React.Dispatch<React.SetStateAction<boolean>>;
}

function MySpaceNav({ spaceType, setSpaceType }: MySpaceNavProps) {
  return (
    <div className="w-full px-5 flex justify-between items-center text-[1.2rem] text-slate-500 gap-2 select-none mt-2">
      <button className={`px-5 py-4 ${spaceType && "text-content-color border-b-2 border-content-color"}`} onClick={() => setSpaceType(true)}>My Recipes</button>
      <button className={`px-5 py-4 ${!spaceType && "text-content-color border-b-2 border-content-color"}`} onClick={() => setSpaceType(false)}>Saved Recipes</button>
    </div>
  );
}

export default MySpaceNav;
