import React from "react";
import Rating from '@mui/material/Rating';
import { styled } from '@mui/system';
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { recipeDetailUrl } from "../assets/data";
import { IRecipeCard } from "../api/types/recipe.type";
import { Skeleton } from "../components/ui/skeleton";

const StyledRating = styled(Rating)({
  fontSize: '0.8rem',
});

interface DisplayCardProps {
  post: IRecipeCard | null;
}

function DisplayCard({ post }: DisplayCardProps) {
  const navigate = useNavigate();

  const goToDetailedPage = () => {
    if (post) {
      navigate(`${recipeDetailUrl}/${post._id}`);
    }
  };

  if (!post) {
    return (
      <div className="flex flex-col justify-start items-start border border-[#6B728040] p-2 w-[42vw] sm:w-[30vw] rounded-md leading-4 select-none">
        <Skeleton className="w-full h-[150px]" />
        <Skeleton className="h-3 w-[35%] mt-3" />
        <Skeleton className="h-3 w-[55%] mt-2" />
        <Skeleton className="h-2 w-[60%] mt-3" />
        <Skeleton className="h-2 w-[40%] mt-1" />
        <Skeleton className="h-3 w-[55%] mt-2" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-start border border-[#6B728040] p-2 w-[42vw] sm:w-[30vw] rounded-md leading-4 select-none" onClick={goToDetailedPage}>
      <img src={post.imgs[0]} className="w-full" alt="pic"/>
      <h2 className="text-[.8rem] mt-3 font-bold">{post.name}</h2>
      <div className="flex justify-start items-center gap-1 my-2">
        <StyledRating name="read-only" defaultValue={post.rating} precision={0.5} size="small" readOnly />
        <p className="leading-3 px-1 rounded-md text-content-color text-[.6rem] bg-[#EBFFF8]">{post.rating.toFixed(1)}</p>
      </div>
      <p className="text-[.67rem] text-slate-500 whitespace-pre-wrap overflow-hidden line-clamp-2">{post.description}</p>
      {post.preferredMealTime.map((mealTime, index) => (
        <Chip
          key={index}
          label={mealTime}
          sx={{ margin: "15px 4px 8px", borderRadius: "8px", backgroundColor: "#F3F4F6", height: "25px" }}
          className="font-[500]"
        />
      ))}
    </div>
  );
}

export default DisplayCard;