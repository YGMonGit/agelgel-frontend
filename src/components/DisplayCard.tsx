import React from "react";
import Rating from '@mui/material/Rating';
import { styled } from '@mui/system';
import { Post } from '../types/post';
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { recipeDetailUrl } from "../assets/data";

const StyledRating = styled(Rating)({
  fontSize: '0.8rem',
});

interface DisplayCardProps {
  post: Post;
}

function DisplayCard({ post }: DisplayCardProps) {
  const navigate = useNavigate();


  const goToDetailedPage = () => {
    navigate(`${recipeDetailUrl}/${post.id}`);
  };

  return (
    <div className="flex flex-col justify-start items-start border border-[#6B728040] p-2 w-[42vw] sm:w-[30vw] rounded-md leading-4 select-none" onClick={goToDetailedPage}>
      <img src={post.imageUrl} alt={post.title} className="w-full" />
      <h2 className="text-[.8rem] mt-3 font-bold">{post.title}</h2>
      <h3 className="text-[.67rem] text-slate-500">{post.subtitle}</h3>
      <div className="flex justify-start items-center gap-1 my-2">
        <StyledRating name="read-only" defaultValue={post.star} precision={0.5} size="small" readOnly />
        <p className="leading-3 px-1 rounded-md text-content-color text-[.6rem] bg-[#EBFFF8]">{post.star.toFixed(1)}</p>
      </div>
      <p className="text-[.67rem] text-slate-500 whitespace-pre-wrap overflow-hidden line-clamp-2">{post.detail}</p>
      <Chip
        label={post.type}
        sx={{ margin: "15px 4px 8px", borderRadius: "8px", backgroundColor: "#F3F4F6", height: "25px" }}
        className="font-[500]"
      />
    </div>
  );
}

export default DisplayCard;
