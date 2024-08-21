import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { HiOutlineBookmark, HiMiniBookmark } from "react-icons/hi2";
import { GoDotFill } from "react-icons/go";

import { Chip } from "@mui/material";

import Rating from '@mui/material/Rating';
import { styled } from '@mui/system';
import Comment from "../components/Comment";
import { useGetRecipeByIdQuery, useGetRecipeCarbsQuery } from "../api/slices/recipe.slices";
import { IIngredient } from "../api/types/ingredient.type";
import { IReview } from "../api/types/review.type";

const StyledRating = styled(Rating)({
  fontSize: '1rem',
});

function RecipeDetail() {
  const rID = useParams();
  const [newComment, setNewComment] = useState("");

  const { data: recipe, isLoading: recipesLoading } = useGetRecipeByIdQuery(String(rID.id));
  const { data: macroNutrients, isLoading: macroNutrientsIsLoading } = useGetRecipeCarbsQuery(String(rID.id));

  const onNewCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewComment(e.target.value);
  if (recipe) {
    return (
      <div className="w-full max-w-[800px] px-5 flex flex-col justify-start items-center">
        <img
          src={recipe.imgs[0]}
          alt={recipe.name}
          className="w-full max-w-[500px] px-1 mt-9 pb-3"
        />
        <div className="w-full flex justify-between items-center mt-6">
          <h2 className="text-[1.3rem] font-bold">{recipe.description}</h2>
          <HiOutlineBookmark className="text-content-color text-[1.5rem]" />
        </div>
        <div className="w-full flex justify-start items-center gap-1 my-2">
          <StyledRating name="read-only" defaultValue={recipe.rating} precision={0.5} size="small" readOnly />
          <p className="leading-3 px-1 rounded-md text-content-color text-[.8rem] bg-[#EBFFF8]">{recipe.rating.toFixed(1)}</p>
        </div>
        <div className="w-full flex justify-start items-center gap-2">

          <Chip label={recipe.cookingTime}
            sx={{ margin: "8px 4px", borderRadius: "8px", backgroundColor: "#F3F4F6", height: "25px", fontWeight: "500" }}
          />
          <Chip label={recipe.preparationDifficulty}
            sx={{ margin: "8px 4px", borderRadius: "8px", backgroundColor: "#F3F4F6", height: "25px", fontWeight: "500" }}
          />

          {
            recipe.preferredMealTime.map((mealTime, index) => (
              <Chip
                label={mealTime}
                sx={{ margin: "8px 4px", borderRadius: "8px", backgroundColor: "#F3F4F6", height: "25px", fontWeight: "500" }}
                className="font-[500]"
                key={index}
              />
            ))
          }
          {
            recipe.medical_condition && recipe.medical_condition.chronicDiseases?.map((chronicDisease, index) => (
              <Chip
                label={chronicDisease}
                sx={{ margin: "8px 4px", borderRadius: "8px", backgroundColor: "#F3F4F6", height: "25px", fontWeight: "500" }}
                className="font-[500]"
                key={index}
              />
            ))
          }
          {
            recipe.medical_condition && recipe.medical_condition.dietary_preferences?.map((dietary_preference, index) => (
              <Chip
                label={dietary_preference}
                sx={{ margin: "8px 4px", borderRadius: "8px", backgroundColor: "#F3F4F6", height: "25px", fontWeight: "500" }}
                className="font-[500]"
                key={index}
              />
            ))
          }
          {
            recipe.medical_condition && recipe.medical_condition.allergies?.map((allergies, index) => (
              <Chip
                label={allergies}
                sx={{ margin: "8px 4px", borderRadius: "8px", backgroundColor: "#F3F4F6", height: "25px", fontWeight: "500" }}
                className="font-[500]"
                key={index}
              />
            ))
          }


        </div>
        <h3 className="w-full leading-5 text-slate-500 text-[.9rem]">{recipe.description}</h3>

        <div className="w-full flex flex-col justify-start items-start mt-5">
          <h3 className="font-semibold mb-1">Macro-nutrients</h3>
          {/* {recipe.macroNutrients.map((macroNutrient, index) => (
            <div key={index} className="flex justify-start items-center gap-1 text-slate-400">
              <GoDotFill className="text-[.7rem] ml-[6px] mr-1 text-slate-500" /> {macroNutrient}
            </div>
          ))} */}
        </div>
        <div className="w-full flex flex-col justify-start items-start mt-5">
          <h3 className="font-semibold mb-1">Ingredients</h3>
          {/* {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex justify-start items-center gap-1 text-slate-400">
              <GoDotFill className="text-[.7rem] ml-[6px] mr-1 text-slate-500" />{(ingredient.ingredient as IIngredient).name} - {ingredient.amount}
            </div>
          ))} */}
        </div>
        <div className="w-full flex flex-col justify-start items-start mt-5">
          <h3 className="font-semibold mb-1">Instructions</h3>
          <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />

        </div>
        <div className="w-full flex flex-col justify-start items-start mt-5">
          <h3 className="font-semibold mb-1">Comments {recipe.totalReviews}</h3>
          {/* {
            recipe.reviews.map((review, index) => (
              <Comment key={index} comments={review as IReview} />
            ))
          } */}
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
