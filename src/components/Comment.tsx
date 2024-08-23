import React from "react";
import { IReview } from "../api/types/review.type";
import styled from "@emotion/styled";
import Rating from '@mui/material/Rating';

interface CommentProps {
  comments: IReview;
}

function Comment({ comments }: CommentProps) {

  const StyledRating = styled(Rating)({
    fontSize: '1rem',
  });

  return (
    <div className="w-full flex justify-start items-start mt-1 mb-3 pb-8 border-b gap-3">
      <div className="h-full flex justify-center items-start">
        <img src={comments.user.profile_img} className="min-w-8 w-8" alt="pic" />
      </div>
      <div className="flex flex-col justify-start items-start flex-grow">
        <h3 className="font-semibold mb-1">{comments.user.full_name} <span className="text-slate-400 font-normal pl-1">{(new Date(comments.createdAt)).toLocaleTimeString()}</span></h3>
        <div className="w-full flex justify-start items-center gap-1 my-2">
          <StyledRating name="read-only" defaultValue={comments.rating} precision={0.5} size="small" readOnly />
          <p className="leading-3 px-1 rounded-md text-content-color text-[.8rem] bg-[#EBFFF8]">{comments.rating.toFixed(1)}</p>
        </div>
        <h3 className="w-full leading-5 text-slate-500 text-[1rem]">{comments.comment}</h3>
      </div>
    </div>
  );
}

export default Comment;
