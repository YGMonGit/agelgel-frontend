import React, { useRef } from "react";
import Rating from '@mui/material/Rating';
import { styled, useTheme } from '@mui/system';
import { Chip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { moderatorRecipeDetailUrl, recipeDetailUrl } from "../assets/data";
import { IRecipeCard } from "../api/types/recipe.type";
import { Skeleton } from "../components/ui/skeleton";

// const StyledRating = styled(Rating)({
//   fontSize: '0.8rem',
// });
const StyledRating = styled(Rating)(({ theme }) => ({
  fontSize: '0.8rem',
  // color: theme.palette.mode === 'dark' ? 'white' : '#000000',
  // '& .MuiRating-iconFilled': {
  //   color: theme.palette.mode === 'dark' ? 'white' : '#000000',
  // },
}));

interface DisplayCardProps {
  post: IRecipeCard | null;
  HSlide?: boolean; 
}

function DisplayCard({ post, HSlide = false }: DisplayCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const goToDetailedPage = () => {
    if (post) {
      console.log(location.pathname);
      
      navigate(`${location.pathname.startsWith("/moderator") ? moderatorRecipeDetailUrl : recipeDetailUrl}/${post._id}`);
    }
  };
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const wheelDelta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollLeft += wheelDelta * 30;
    }
  };

  if (!post) {
    return (
      <div className={`flex flex-col justify-start items-start border border-[#6B728040] p-2 w-[42vw] sm:w-[30vw] ${ HSlide ? "max-w-[175px]" : "max-w-[245px]"} rounded-md leading-4 select-none`}>
        <Skeleton className="w-full aspect-square" />
        <Skeleton className="h-3 w-[35%] mt-3" />
        <Skeleton className="h-3 w-[55%] mt-2" />
        <Skeleton className="h-2 w-[60%] mt-3" />
        <Skeleton className="h-2 w-[40%] mt-1" />
        <Skeleton className="h-3 w-[55%] mt-2" />
      </div>
    );
  }

  return (
    <div className={`flex flex-col flex-grow justify-start items-start p-2 min-w-[150px] w-[42vw] sm:w-[30vw] ${ HSlide ? "max-w-[175px]" : "max-w-[245px]"} rounded-md leading-4 select-none shadow-xl h-full border border-[#63796b33] cursor-pointer`}
      onClick={goToDetailedPage}>
      <img src={post.imgs[0]} className="w-full aspect-square rounded-t-md" alt="pic" />
      <h2 className="text-[.8rem] mt-3 font-bold whitespace-pre-wrap overflow-hidden line-clamp-1">{post.name}</h2>
      <div className="flex justify-start items-center gap-1 my-2">
        <StyledRating name="read-only" defaultValue={post.rating} precision={0.5} size="small" readOnly className="dark:bg-neutral-700 dark:px-1 rounded-full" />
        <p className="leading-3 px-1 rounded-md text-content-color text-[.6rem] bg-[#EBFFF8] dark:bg-opacity-15">{post.rating.toFixed(1)}</p>
      </div>
      <p className="text-[.67rem] text-slate-500 whitespace-pre-wrap overflow-hidden line-clamp-2 flex-grow">{post.description}</p>
      <div className="flex justify-start items-center w-full gap-1">
        <p className="text-[.8rem] text-slate-400 italic leading-none ml-1 mt-4 mb-2">for </p>
        <div className="flex justify-start items-center gap-1 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          ref={scrollableDivRef}
          onWheel={handleWheel}
        >
          {post.preferredMealTime.map((mealTime, index) => (
            <h4 key={index} className="bg-green-100 dark:bg-opacity-30 px-2 py-[1px] text-[.7rem] font-semibold rounded-[6px] mt-4 mb-2">{mealTime}</h4>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayCard;