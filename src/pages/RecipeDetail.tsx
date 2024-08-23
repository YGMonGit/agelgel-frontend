import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { HiOutlineBookmark, HiMiniBookmark } from "react-icons/hi2";
import { GoDotFill } from "react-icons/go";
import { BsFillPersonCheckFill } from "react-icons/bs";

import { Chip } from "@mui/material";

import Rating from '@mui/material/Rating';
import { styled } from '@mui/system';
import Comment from "../components/Comment";
import { useGetRecipeByIdQuery, useGetRecipeCarbsQuery } from "../api/slices/recipe.slices";
import { IIngredient } from "../api/types/ingredient.type";
import { IReview } from "../api/types/review.type";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import User from "../assets/images/post/user_1.png";

import { Skeleton } from "../components/ui/skeleton";
import WideButton from "../components/WideButton";

const StyledRating = styled(Rating)({
  fontSize: '1rem',
});

function RecipeDetail() {
  const rID = useParams();
  const [newComment, setNewComment] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [value, setValue] = React.useState<number | null>(0);
  const [inputFocused, setInputFocused] = useState(false);

  const isButtonVisible = value || inputFocused || newComment.length > 0;

  useEffect(() => {
    const handleResizeWithReset = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResizeWithReset);

    return () => {
      window.removeEventListener("resize", handleResizeWithReset);
    };
  }, []);

  async function addComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Adding comment...");
  }

  const properties = {
    prevArrow: (
      <button className="absolute top-1/2 transform -translate-y-1/2 bg-black ml-3 bg-opacity-40 rounded-full p-2 cursor-pointer z-10 text-white flex items-center justify-center left-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    ),
    nextArrow: (
      <button className="absolute top-1/2 transform -translate-y-1/2 bg-black mr-3 bg-opacity-40 rounded-full p-2 cursor-pointer z-10 text-white flex items-center justify-center right-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    ),
  };

  const { data: recipe, isLoading: recipesLoading } = useGetRecipeByIdQuery(String(rID.id));
  const { data: macroNutrients, isLoading: macroNutrientsIsLoading } = useGetRecipeCarbsQuery(String(rID.id));

  const onNewCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewComment(e.target.value);

  if (!recipe) {
    return (
      <div className="w-full h-full max-w-[800px] px-5 flex flex-col justify-start items-start gap-3">
        <Skeleton className="w-full my-5 h-[50%] rounded-t-2xl" />
        <Skeleton className="h-2 w-[35%]" />
        <Skeleton className="h-5 w-[50%]" />
        <Skeleton className="h-5 w-[60%] mt-10" />
        <Skeleton className="h-5 w-[50%]" />
        <Skeleton className="h-2 w-[30%]" />
        <Skeleton className="h-2 w-[30%]" />
        <Skeleton className="h-2 w-[30%]" />
        <Skeleton className="h-5 w-[50%] mt-3" />
        <Skeleton className="h-2 w-[30%]" />
        <Skeleton className="h-2 w-[30%]" />
        <Skeleton className="h-2 w-[30%]" />
      </div>
    );
  }

  if (recipe) {
    return (
      <div className="w-full max-w-[800px] px-5 flex flex-col justify-start items-center">
        <div className=" bg-neutral-100 my-5 slide-container bg-custom-content-bg w-full max-w-[500px]">
          {recipe?.imgs.length > 1 ? (
            <Slide
              duration={9000}
              transitionDuration={100}
              arrows={windowWidth <= 640 ? false : true}
              autoplay
              pauseOnHover
              {...properties}
            >
              {recipe?.imgs.map((slideImage, index) => (
                <div key={index}>
                  <div className="flex justify-center items-center bg-white w-full h-full relative overflow-hidden">
                    <img
                      src={slideImage}
                      alt="pic"
                      className="w-full"
                    />
                  </div>
                </div>
              ))}
            </Slide>
          ) : (
            <div className="flex justify-center items-center bg-cover w-full h-full rounded-3xl relative">
              <img
                src={recipe?.imgs[0]}
                alt="pic"
                className="w-full"
              />
            </div>
          )}
        </div>
        <div className="w-full flex justify-between items-center leading-none">
          <div className="flex items-center gap-2">
            <img src={User} className="min-w-8 w-8" alt="pic" />
            <p className="text-[1.3rem] font-semibold">Name</p>
          </div>
          <BsFillPersonCheckFill className="text-content-color text-[1.5rem]" />
        </div>
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
          {
            recipe.reviews.map((review, index) => (
              <Comment key={index} comments={review as IReview} />
            ))
          }
        </div>
        <form className="group w-full flex flex-col justify-start items-start gap-3" onSubmit={addComment}>
          <Rating
            name="simple-controlled"
            size="small"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <input
            type="text"
            placeholder="Add a comment ..."
            value={newComment}
            onChange={onNewCommentChange}
            autoComplete="off"
            required
            className={`w-full py-[10px] bg-[#F9FAFB] leading-none text-[1rem] px-4 border outline-none rounded-lg border-[#D1D5DB] mb-5 group-hover:mb-0`}
          />
          {/* <WideButton label="Comment" color="bg-content-color" /> */}
          <button className="hidden group-hover:block w-full py-[10px] bg-content-color mb-5 text-white rounded-lg">Comment</button>
        </form>
      </div>
    );
  }
}

export default RecipeDetail;
