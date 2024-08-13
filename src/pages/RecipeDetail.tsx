import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { posts, comment } from "../assets/data";

import { HiOutlineBookmark, HiMiniBookmark } from "react-icons/hi2";
import { GoDotFill } from "react-icons/go";

import { Chip } from "@mui/material";

import Rating from '@mui/material/Rating';
import { styled } from '@mui/system';
import Comment from "../components/Comment";

const StyledRating = styled(Rating)({
  fontSize: '1rem',
});

function RecipeDetail() {
  const rID = useParams();
  const [newComment, setNewComment] = useState("");
  const post = posts.find((post) => post.id === Number(rID.id));

  const onNewCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewComment(e.target.value);
  if(post){
    return (
      <div className="w-full max-w-[800px] px-5 flex flex-col justify-start items-center">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full max-w-[500px] px-1 mt-9 pb-3"
        />
        <div className="w-full flex justify-between items-center mt-6">
          <h2 className="text-[1.3rem] font-bold">{post.title}</h2>
          <HiOutlineBookmark className="text-content-color text-[1.5rem]" />
        </div>
        <div className="w-full flex justify-start items-center gap-1 my-2">
          <StyledRating name="read-only" defaultValue={post.star} precision={0.5} size="small" readOnly />
          <p className="leading-3 px-1 rounded-md text-content-color text-[.8rem] bg-[#EBFFF8]">{post.star.toFixed(1)}</p>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <Chip label={post.type}
            sx={{ margin: "8px 4px", borderRadius: "8px", backgroundColor: "#F3F4F6", height: "25px", fontWeight: "500" }}
          />
          <Chip label={post.time}
            sx={{ margin: "8px 4px", borderRadius: "8px", backgroundColor: "#F3F4F6", height: "25px", fontWeight: "500" }}
          />
          <Chip label={post.difficulty}
            sx={{ margin: "8px 4px", borderRadius: "8px", backgroundColor: "#F3F4F6", height: "25px", fontWeight: "500" }}
          />
        </div>
        <h3 className="w-full leading-5 text-slate-500 text-[.9rem]">{post.detail}</h3>

        <div className="w-full flex flex-col justify-start items-start mt-5">
          <h3 className="font-semibold mb-1">Macro-nutrients</h3>
          {post.macroNutrients.map((macroNutrient, index) => (
            <div key={index} className="flex justify-start items-center gap-1 text-slate-400">
              <GoDotFill className="text-[.7rem] ml-[6px] mr-1 text-slate-500" /> {macroNutrient}
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col justify-start items-start mt-5">
          <h3 className="font-semibold mb-1">Ingredients</h3>
          {post.ingredients.map((ingredient, index) => (
            <div key={index} className="flex justify-start items-center gap-1 text-slate-400">
              <GoDotFill className="text-[.7rem] ml-[6px] mr-1 text-slate-500" />{ingredient}
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col justify-start items-start mt-5">
          <h3 className="font-semibold mb-1">Instructions</h3>
          <h3 className="w-full leading-5 text-slate-500 text-[1rem]">Lorem ipsum dolor sit amet consectetur. Cursus interdum fermentum malesuada erat metus viverra velit in quam.</h3>
          <div className="flex justify-start items-center gap-1 text-slate-400">
            <GoDotFill className="text-[.7rem] ml-[6px] mr-1 text-slate-500" /> Lorem ipsum dolor sit amet consectetur.
          </div>
          <div className="flex justify-start items-center gap-1 text-slate-400">
            <GoDotFill className="text-[.7rem] ml-[6px] mr-1 text-slate-500" /> Lorem ipsum dolor sit amet consectetur.
          </div>
          <div className="flex justify-start items-center gap-1 text-slate-400">
            <GoDotFill className="text-[.7rem] ml-[6px] mr-1 text-slate-500" /> Lorem ipsum dolor sit amet consectetur.
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-start mt-5">
          <h3 className="font-semibold mb-1">Comments</h3>
          <Comment comments={comment} />
          <Comment comments={comment} />
        </div>
        <input
          type="text"
          placeholder="Add a comment ..."
          value={newComment}
          onChange={onNewCommentChange}
          autoComplete="off"
          required
          className={`w-full py-[10px] bg-[#F9FAFB] leading-none text-[1rem] px-4 border outline-none rounded-lg border-[#D1D5DB] mb-5`}
        />
      </div>
    );
  }
}

export default RecipeDetail;
