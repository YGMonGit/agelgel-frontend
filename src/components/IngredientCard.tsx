import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Skeleton } from "./ui/skeleton";
import IngredientIcon from "../assets/icons/apple-icon.png";
import { IIngredient } from "../api/types/ingredient.type";

interface IngredientCardProps {
  ingredient: IIngredient | null;
}

function IngredientCard({ ingredient }: IngredientCardProps) {
  if (!ingredient) {
    return (
      <div className="flex justify-start items-center p-2 w-full rounded-lg bg-neutral-100 leading-4 select-none gap-3">
        <Skeleton className="h-[61px] aspect-square rounded-full" />
        <div className="flex-grow flex flex-col justify-center items-start h-full">
          <Skeleton className="h-[10px] w-[55%] rounded-md" />
          <Skeleton className="h-[6px] w-[50%] mt-[6px] rounded-md" />
          <Skeleton className="h-[6px] w-[40%] mt-[2px] rounded-md" />
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    );
  }
  return (
    <div className="w-full flex justify-start items-center gap-2 py-2 bg-[#F6F6F6] px-3 rounded-lg">
      <img
        src={IngredientIcon}
        className="w-[61px] p-3 aspect-square"
      />
      <div className="w-full flex-grow flex flex-col justify-center items-start">
        <p className="flex items-center gap-1 leading-none font-semibold">
          {ingredient.name}
        </p>
        <p className="text-[.8rem] text-slate-400 leading-none mt-1">
          {ingredient.localName}
        </p>
        <p className="text-[.8rem] text-slate-400 leading-none">
          {ingredient.type}
        </p>
      </div>
      <MdEdit className="text-[2.2rem] text-content-color" />
      <MdDelete className="text-[2.2rem] text-[#DC3D3D]" />
    </div>
  );
}

export default IngredientCard;
