import React from "react";
import { Comments } from "../types/comment";

interface CommentProps {
  comments: Comments;
}

function Comment({ comments }: CommentProps) {
  return (
    <div className="w-full flex justify-start items-start mt-1 mb-3 pb-8 border-b gap-3">
      <div className="h-full flex justify-center items-start">
        <img src={comments.imageUrl} alt={comments.name} className="min-w-8 w-8" />
      </div>
      <div className="flex flex-col justify-start items-start flex-grow">
        <h3 className="font-semibold mb-1">{comments.name} <span className="text-slate-400 font-normal pl-1">{comments.postTime}</span></h3>
        <h3 className="w-full leading-5 text-slate-500 text-[1rem]">{comments.content}</h3>
      </div>
    </div>
  );
}

export default Comment;
