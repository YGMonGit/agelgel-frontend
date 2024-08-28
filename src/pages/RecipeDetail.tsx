import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { HiOutlineBookmark, HiMiniBookmark } from "react-icons/hi2";
import { GoDotFill } from "react-icons/go";
import { BsFillPersonCheckFill } from "react-icons/bs";

import { LuClock9 } from "react-icons/lu";
import { IoSpeedometerOutline } from "react-icons/io5";

import { Chip } from "@mui/material";

import Rating from '@mui/material/Rating';
import { styled } from '@mui/system';
import Comment, { ModeratorComment } from "../components/Comment";
import { useGetPrivateRecipeByIdQuery, useGetRecipeByIdQuery, useGetRecipeCarbsQuery, useGetRecipesQuery, useSimilarQuery } from "../api/slices/recipe.slices";
import { IIngredient } from "../api/types/ingredient.type";
import { IReview } from "../api/types/review.type";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import IngredientDefaultImage from "../assets/images/default_image_1.png";
import FireIcon from "../assets/images/fire.png";
import ProteinIcon from "../assets/images/protein.png";
import FatIcon from "../assets/images/fat.png";
import FiberIcon from "../assets/images/fiber.png";
import CarbsIcon from "../assets/images/carbs.png";

import { Skeleton } from "../components/ui/skeleton";
import WideButton from "../components/WideButton";
import SpoonacularClient from "../api/SpoonacularClient";
import FilterBar from "../components/FilterBar";
import { useCreateReviewMutation, useGetRecipeReviewsQuery } from "../api/slices/review.slices";
import { set } from "react-hook-form";
import CircularProgress from "../components/CircularProgress";
import { HiFire } from "react-icons/hi";
import DisplayCard from "../components/DisplayCard";
import { useToggleBookedRecipeMutation } from "../api/slices/user.slices";
import ClipLoader from "react-spinners/ClipLoader";
import FilterBarActive from "../components/FilterBarActive";

const StyledRating = styled(Rating)({
  fontSize: '1rem',
});

function RecipeDetail() {
  const rID = useParams();
  const [newComment, setNewComment] = useState("");
  const [value, setValue] = React.useState<number | null>(0);
  const showCommentButton = value !== 0 && newComment.trim() !== "";

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const wheelDelta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollLeft += wheelDelta * 30;
    }
  };

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

  const { data: recipe, isLoading: recipesLoading } = useGetPrivateRecipeByIdQuery(String(rID.id));
  const [reviewsPagination, setReviewsPagination] = useState({ skip: 0, limit: 10 });
  const { data: reviews, isLoading: reviewsLoading } = useGetRecipeReviewsQuery({ recipeId: String(rID.id), skip: reviewsPagination.skip, limit: reviewsPagination.limit });
  const [CreateReview, { isLoading: createLoading }] = useCreateReviewMutation();
  const [ingredientImages, setIngredientImages] = useState<string[]>([]);
  const [ToggleBookedRecipe] = useToggleBookedRecipeMutation();

  const [page, setPage] = useState(0);

  const { data: recommendedRecipes, isLoading } =
    useSimilarQuery({ recipeId: String(rID.id), page: page });

  const skeletonCount = isLoading
    ? 10
    : recommendedRecipes?.length || 0;

  useEffect(() => {
    if (recipe) {
      const fetchIngredientImages = async () => {
        let images = await Promise.all(
          recipe.ingredients.map(async (ingredient) => {
            const res = await new SpoonacularClient().getIngredientsImages([ingredient.name]);
            return res;
          }
          ));
        if (images.every(arr => arr.length === 1 && arr[0] === undefined)) {
          images = [];
        }
        setIngredientImages(images as any);
      };

      fetchIngredientImages();
    }
  }, [recipe]);

  async function addComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Adding comment...");
    await CreateReview({
      recipe: recipe?._id ?? "",
      rating: value ?? 0,
      comment: newComment,
    }).unwrap();
    setNewComment("");
    setValue(0);
  }

  function convertToEmbedUrl(youtubeLink: string) {
    const videoId = youtubeLink.split('v=')[1];
    const ampersandPosition = videoId ? videoId.indexOf('&') : -1;
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  }

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
            <img src={recipe.user.profile_img} className="w-8 h-8 rounded-full object-cover" alt="pic" />
            <p className="text-[1.3rem] font-semibold">{recipe.user.full_name}</p>
          </div>
          <BsFillPersonCheckFill className="text-content-color text-[1.5rem]" />
        </div>
        <div className="w-full flex justify-between items-center mt-6">
          <h2 className="text-[1.3rem] font-bold">{recipe.name}</h2>
          {
            recipe.hasBookedRecipe ? <HiMiniBookmark fill="#0e9f6e" className="text-[1.5rem] text-highlight-color" onClick={async () => {
              await ToggleBookedRecipe({ recipeId: recipe._id }).unwrap();
            }
            } /> : <HiOutlineBookmark className="text-[1.5rem] text-content-color" onClick={async () => {
              await ToggleBookedRecipe({ recipeId: recipe._id }).unwrap();
            }
            } />
          }
        </div>
        <div className="w-full flex justify-start items-center gap-1 my-2">
          <StyledRating name="read-only" defaultValue={recipe.rating} precision={0.5} size="small" readOnly />
          <p className="leading-3 px-1 rounded-md text-content-color text-[.8rem] bg-[#EBFFF8]">{recipe.rating.toFixed(1)}</p>
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <div className="flex justify-start items-center gap-2 mb-3">
            <div className="w-full flex justify-start items-center bg-[#F3F4F6] pl-[10px] rounded-[8px]">
              <LuClock9 className="text-[.8rem] text-content-color -mr-[6px] z-20 italic" />
              <Chip label={`${recipe.cookingTime} min`}
                sx={{ borderRadius: "8px", backgroundColor: "#F3F4F6", height: "25px", fontWeight: "500" }}
              />
            </div>
            <div className="w-full flex justify-start items-center bg-[#F3F4F6] pl-[10px] rounded-[8px]">
              <IoSpeedometerOutline className="text-[.8rem] text-content-color -mr-[6px] z-20 italic" />
              <Chip label={recipe.preparationDifficulty}
                sx={{ borderRadius: "8px", backgroundColor: "#F3F4F6", height: "25px", fontWeight: "500" }}
              />
            </div>
          </div>
          <FilterBar label="Preferred meal time" data={recipe.preferredMealTime} />
          <FilterBar label="Health condition" data={recipe.medical_condition.chronicDiseases} />
          <FilterBar label="Dietary preferences" data={recipe.medical_condition.dietary_preferences} />
          <FilterBar label="Allergies" data={recipe.medical_condition.allergies} />



        </div>
        <h3 className="w-full leading-5 text-slate-500 text-[.9rem] mt-3">{recipe.description}</h3>

        <div className="w-full flex flex-col justify-start items-start mt-5">
          <h3 className="font-semibold mb-1">Macro-nutrients</h3>
          <div className="flex justify-start items-center gap-1 w-full">
            <CircularProgress value={recipe.nutrition.calories} maxValue={1000} image={FireIcon} nutrient="Calorie" unit="Kcal" />
            <CircularProgress value={recipe.nutrition.protein_g} maxValue={50} image={ProteinIcon} nutrient="Protein" unit="g" />
            <CircularProgress value={recipe.nutrition.fat_total_g} maxValue={100} image={FatIcon} nutrient="Fat" unit="g" />
            <CircularProgress value={recipe.nutrition.carbohydrates_total_g} maxValue={100} image={CarbsIcon} nutrient="Carbs" unit="g" />
            <CircularProgress value={recipe.nutrition.fiber_g} maxValue={100} image={FiberIcon} nutrient="Fiber" unit="g" />
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-start mt-5 gap-2">
          <h3 className="font-semibold mb-1">Ingredients</h3>
          {recipe.ingredients.map((ingredient, index) => {
            return (
              <div key={index} className="flex justify-start items-center leading-none gap-1 text-slate-400">
                <img src={ingredientImages[index] !== undefined ? ingredientImages[index] : IngredientDefaultImage} alt="pic" className={`min-w-8 w-8 ${ingredientImages[index] === undefined && "rounded-full p-[5px] shadow-md bg-neutral-200"}`} />
                <GoDotFill className="text-[.7rem] ml-[6px] mr-1 text-slate-500" />{(ingredient.ingredient as IIngredient).name}( {(ingredient.ingredient as IIngredient).localName} )- {ingredient.amount} {(ingredient.ingredient as IIngredient).unit}
              </div>
            )
          })}
        </div>
        <div className="w-full flex flex-col justify-start items-start mt-5">
          <h3 className="font-semibold mb-1">Instructions</h3>
          <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />

          <div className="w-full mt-5">
            {recipe.youtubeLink && (
              <iframe
                width="100%"
                height="315"
                src={convertToEmbedUrl(recipe.youtubeLink)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

        </div>
        <div className="w-full flex flex-col justify-start items-start mt-5">
          <h3 className="font-semibold mb-1">Similar recipes</h3>
          <div className="flex overflow-x-scroll justify-start items-center gap-4 w-full pb-8 px-3"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            ref={scrollableDivRef}
            onWheel={handleWheel}
          >
            {isLoading
              ? Array.from({ length: skeletonCount }).map((_, index) => (
                <DisplayCard post={null} key={`skeleton-${index}`} />
              ))
              : recommendedRecipes?.map((post, index) => (
                <DisplayCard post={post} key={index} />
              ))}
          </div>
        </div>

        <div className="w-full flex flex-col justify-start items-start mt-5">
          <h3 className="font-semibold mb-1">Comments {recipe.totalReviews}</h3>
          <ModeratorComment moderator={recipe.moderator} />

          {
            reviews?.map((review, index) => (
              <Comment key={index} comments={review as IReview} />
            ))
          }
        </div>
        <form className="w-full flex flex-col justify-start items-start gap-3" onSubmit={addComment}>
          <Rating
            name="simple-controlled"
            size="small"
            value={value}
            onChange={(event: React.SyntheticEvent<Element, Event>, newValue: number | null) => {
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
            className={`w-full py-[10px] bg-[#F9FAFB] leading-none text-[1rem] px-4 border outline-none rounded-lg border-[#D1D5DB]`}
          />
          {!showCommentButton && (<p className="text-yellow-300 text-[.8rem] leading-none mb-3 -mt-2">{value === 0 && newComment.trim() !== "" && "Please fill retting"}{newComment.trim() === "" && value !== 0 && "Please fill comment"}{newComment.trim() === "" && value === 0 && "Please fill retting and comment"}</p>)}
          {createLoading ? (
            <button
              type="submit"
              className={`flex justify-center items-center gap-2 ${showCommentButton ? "w-full h-[52px] bg-content-color mb-5 text-white rounded-lg" : "w-full py-[8px] bg-neutral-300 text-neutral-500 mb-5"}`}
              disabled={false}>
              <ClipLoader
                color={"white"}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              <p className="text-white text-[1.1rem] italic">loading ...</p>
            </button>
          ) : (
            <button
              type="submit"
              className={`${showCommentButton ? "w-full h-[52px] bg-content-color mb-5 text-white rounded-lg" : "w-full py-[8px] bg-neutral-300 text-neutral-500 mb-5"}`}
              disabled={!showCommentButton}>
              Comment
            </button>
          )}
        </form>
      </div>
    );
  }
}

export default RecipeDetail;
