import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { HiOutlineBookmark, HiMiniBookmark } from "react-icons/hi2";
import { GoDotFill } from "react-icons/go";
import { MdAdd, MdClose, MdEmail, MdVerified } from "react-icons/md";
import { TiMinus } from "react-icons/ti";

import { LuClock9 } from "react-icons/lu";
import { IoSpeedometerOutline } from "react-icons/io5";

import { Chip } from "@mui/material";

import Rating from "@mui/material/Rating";
import { styled } from "@mui/system";
import Comment, { ModeratorComment } from "../components/Comment";
import {
  useGetPrivateRecipeByIdQuery,
  useSimilarQuery,
} from "../api/slices/recipe.slices";
import { IReview } from "../api/types/review.type";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import IngredientDefaultImage from "../assets/images/default_image_1.png";
import FireIcon from "../assets/images/fire.png";
import ProteinIcon from "../assets/images/protein.png";
import FatIcon from "../assets/images/fat.png";
import FiberIcon from "../assets/images/fiber.png";
import CarbsIcon from "../assets/images/carbs.png";
import EmptyListIcon from "../assets/images/empty-list.png";

import { Skeleton } from "../components/ui/skeleton";
import WideButton from "../components/WideButton";
import SpoonacularClient from "../api/SpoonacularClient";
import FilterBar from "../components/FilterBar";
import {
  useCreateReviewMutation,
  useGetRecipeReviewsQuery,
} from "../api/slices/review.slices";
import CircularProgress from "../components/CircularProgress";
import DisplayCard from "../components/DisplayCard";
import {
  useGetUserByIdQuery,
  useToggleBookedRecipeMutation,
} from "../api/slices/user.slices";
import ClipLoader from "react-spinners/ClipLoader";
import FilterBarActive from "../components/FilterBarActive";
import {
  getCalorieColor,
  getCarbsColor,
  getFatColor,
  getFiberColor,
  getProteinColor,
} from "../assets/data";
import PieChart from "../components/PieChart";
import {
  useAddToMealPlanMutation,
  useCheckIfUserRecipeExistsQuery,
  useRemoveFromMealPlanMutation,
} from "../api/slices/mealPlanner.slices";

import {
  EPreferredMealTimeForMealPlan,
} from "../api/types/recipe.type";
import AlertDialogBox from "../components/AlertDialogBox";
import { FaPhoneAlt } from "react-icons/fa";

const StyledRating = styled(Rating)({
  fontSize: "1rem",
});

function RecipeDetail() {
  const rID = useParams();
  const [newComment, setNewComment] = useState("");
  const [value, setValue] = React.useState<number | null>(0);
  const showCommentButton = value !== 0 && newComment.trim() !== "";

  const [filter, setFilter] = useState(EPreferredMealTimeForMealPlan.breakfast);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

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

  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [openDialogBoxTwo, setOpenDialogBoxTwo] = useState(false);

  const {
    data: recipe,
  } = useGetPrivateRecipeByIdQuery(String(rID.id));
  const [reviewsPagination, setReviewsPagination] = useState({
    skip: 0,
    limit: 10,
  });
  const { data: reviews, isLoading: reviewsLoading } = useGetRecipeReviewsQuery(
    {
      recipeId: String(rID.id),
      skip: reviewsPagination.skip,
      limit: reviewsPagination.limit,
    }
  );
  const [CreateReview, { isLoading: createLoading }] =
    useCreateReviewMutation();
  const [ingredientImages, setIngredientImages] = useState<string[]>([]);
  const [ToggleBookedRecipe, { isLoading: bookMarkLoading }] =
    useToggleBookedRecipeMutation();

  const [page, setPage] = useState(0);

  const {
    data: recommendedRecipes,
    isLoading,
    isSuccess,
  } = useSimilarQuery({ recipeId: String(rID.id), page: page });

  const skeletonCount = isLoading ? 10 : recommendedRecipes?.length || 0;

  useEffect(() => {
    if (recipe) {
      const fetchIngredientImages = async () => {
        let images = await Promise.all(
          recipe.ingredients.map(async (ingredient) => {
            const res = await new SpoonacularClient().getIngredientsImages([
              ingredient.name,
            ]);
            return res;
          })
        );
        if (images.every((arr) => arr.length === 1 && arr[0] === undefined)) {
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
    const videoId = youtubeLink.split("v=")[1];
    const ampersandPosition = videoId ? videoId.indexOf("&") : -1;
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId.substring(
        0,
        ampersandPosition
      )}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  }

  const onNewCommentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewComment(e.target.value);

  const { data: user } = useGetUserByIdQuery(String(recipe?.user.user));

  const [addToMealPlan, { isLoading: addToMealPlanIsLoading }] =
    useAddToMealPlanMutation();
  const [removeFromMealPlan, { isLoading: removeFromMealPlanIsLoading }] =
    useRemoveFromMealPlanMutation();

  const { data: isUserRecipeExists, isError: isUserRecipeExistsError } =
    useCheckIfUserRecipeExistsQuery(
      {
        recipeID: recipe?._id as any,
      },
      {
        skip: !recipe,
      }
    );

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
    let caloryInGram = recipe.nutrition.calories * 0.129598;

    const pieChartData = {
      labels: ["Calorie", "Protein", "Fat", "Carbs", "Fiber"],
      datasets: [
        {
          label: "Nutrition",
          data: [
            caloryInGram,
            recipe.nutrition.protein_g,
            recipe.nutrition.fat_total_g,
            recipe.nutrition.carbohydrates_total_g,
            recipe.nutrition.fiber_g,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.9)",
            "rgba(54, 162, 235, 0.9)",
            "rgba(255, 206, 86, 0.9)",
            "rgba(75, 192, 192, 0.9)",
            "rgba(153, 102, 255, 0.9)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    return (
      <div className="w-full max-w-[800px] px-5 flex flex-col justify-start items-center">
        <div className=" bg-neutral-100 dark:bg-transparent dark:text dark:text-slate-400 italic my-5 slide-container bg-custom-content-bg w-full max-w-[500px]">
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
                  <div className="flex justify-center items-center bg-white dark:bg-neutral-800 w-full h-full relative overflow-hidden">
                    <img src={slideImage} alt={recipe?.name} className="w-full" />
                  </div>
                </div>
              ))}
            </Slide>
          ) : (
            <div className="flex justify-center items-center bg-cover dark:bg-neutral-800 w-full h-full rounded-3xl relative">
              <img src={recipe?.imgs[0]} alt={recipe?.name} className="w-full" />
            </div>
          )}
        </div>
        <div className="w-full flex justify-between items-center leading-none">
          <div className="flex items-center gap-2 select-none cursor-pointer"
            onClick={() => {
              setOpenDialogBoxTwo(true);
            }}
          >
            <img
              src={recipe.user.profile_img}
              className="w-8 h-8 rounded-full object-cover"
              alt="pic"
            />
            {openDialogBoxTwo && (
              <AlertDialogBox
                  // cancelContent="Cancel"
                  buttonContent="Close"
                  closeDialog={() => {
                    setOpenDialogBoxTwo(false);
                  }}
                  handleClick={() => {
                    setOpenDialogBoxTwo(false);
                  }}
                  single={true}
                >
                  <div className="w-full flex flex-col items-start justify-start gap-2 *:pl-4">
                    <p className="flex justify-start items-center gap-2 text-slate-400 italic"><img src={recipe.user.profile_img} className="w-6 h-6 object-cover rounded-full bg-neutral-100 dark:bg-neutral-800" /> {user?.full_name}</p>
                    <p className="flex justify-start items-center gap-2 text-slate-400 italic"><FaPhoneAlt className="text-content-color" /> {user?.phone_number}</p>
                    <p className="flex justify-start items-center gap-2 text-slate-400 italic"><MdEmail className="text-content-color"/> {user?.email}</p>
                  </div>
                </AlertDialogBox>
            )}
            <p className="text-[1.3rem] font-semibold">
              {recipe.user.full_name}
            </p>
          </div>
          {user && user.verified === "verified" && (
            <MdVerified className="text-content-color text-[1.5rem]" />
          )}
        </div>
        <div className="w-full flex justify-between items-center mt-6">
          <h2 className="text-[1.3rem] font-bold">{recipe.name}</h2>
          {recipe.hasBookedRecipe ? (
            !bookMarkLoading ? (
              <HiMiniBookmark
                fill="#0e9f6e"
                className="text-[1.5rem] text-highlight-color"
                onClick={async () => {
                  await ToggleBookedRecipe({ recipeId: recipe._id }).unwrap();
                }}
              />
            ) : (
              <ClipLoader
                color={"var(--content-color)"}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )
          ) : !bookMarkLoading ? (
            <HiOutlineBookmark
              className="text-[1.5rem] text-content-color"
              onClick={async () => {
                await ToggleBookedRecipe({ recipeId: recipe._id }).unwrap();
              }}
            />
          ) : (
            <ClipLoader
              color={"var(--content-color)"}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </div>
        <div className="w-full flex justify-start items-center gap-1 my-2">
          <StyledRating
            name="read-only"
            defaultValue={recipe.rating}
            precision={0.5}
            size="small"
            readOnly
            className="dark:bg-neutral-800 rounded-full dark:px-1"
          />
          <p className="leading-3 px-1 py-[2px] rounded-full text-content-color text-[.8rem] bg-[#EBFFF8] bg-opacity-10">
            {recipe.rating.toFixed(1)}
          </p>
        </div>
        {isUserRecipeExists?.isRecipeInMealPlan == false ? (
          <>
            <button
              className="w-full px-5 border border-content-color h-[52px] rounded-lg flex justify-center items-center gap-2 mt-2 mb-5"
              onClick={() => {
                setOpenDialogBox(true);
              }}
            >
              <MdAdd className="text-[1.3rem] text-content-color" />
              <p className="text-slate-400 font-normal">Add to Meal Plan</p>
            </button>
            {openDialogBox && (
              <AlertDialogBox
                
                closeDialog={() => {
                  setOpenDialogBox(false);
                }}
                handleAction={async () => {
                  try {
                    await addToMealPlan({
                      mealTime: filter,
                      recipeID: recipe._id,
                    });
                    setOpenDialogBox(false);
                  } catch (error) {}
                }}
                isLoading={isLoading}
              >
                <div className="w-full flex flex-col justify-start items-start gap-2">
                  <FilterBarActive
                    data={[...Object.values(EPreferredMealTimeForMealPlan)]}
                    selectedChip={filter}
                    setSelectedChip={(filter) => {
                      setFilter(filter);
                    }}
                  />
                  <WideButton
                    disable={addToMealPlanIsLoading}
                    clickAction={async () => {
                      try {
                        await addToMealPlan({
                          mealTime: filter,
                          recipeID: recipe._id,
                        });
                      } catch (error) {}
                    }}
                    label={
                      <div className="w-full flex justify-center items-center gap-2">
                        {addToMealPlanIsLoading ? (
                          <ClipLoader
                            color={"var(--content-color)"}
                            size={15}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          <MdAdd className="text-[1.3rem]" />
                        )}
                        <p className="text-slate-400 font-normal">
                          Add to Meal Plan
                        </p>
                      </div>
                    }
                    color="dark:bg-neutral-950 bg-white"
                    outline={true}
                  />
                </div>
              </AlertDialogBox>
            )}
          </>
        ) : !isUserRecipeExistsError ? (
          <div className="w-full mb-3 mt-2">
            <WideButton
              disable={removeFromMealPlanIsLoading}
              clickAction={async () => {
                try {
                  await removeFromMealPlan({
                    recipeID: recipe._id,
                  });
                } catch (error) {}
              }}
              label={
                <div className="w-full flex justify-center items-center gap-2">
                  {removeFromMealPlanIsLoading ? (
                    <ClipLoader
                      color={"var(--content-color)"}
                      size={15}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    <TiMinus className="text-[1.3rem]" />
                  )}
                  <p className="text-slate-400 font-normal">
                    remove from Meal Plan
                  </p>
                </div>
              }
              color="dark:bg-neutral-900"
              outline={true}
            />
          </div>
        ) : null}
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <div className="flex justify-start items-center gap-2 mb-3">
            <div className="w-full flex justify-start items-center bg-[#F3F4F6] dark:bg-opacity-30 pl-[10px] rounded-[8px]">
              <LuClock9 className="text-[.8rem] text-content-color -mr-[6px] z-10 italic" />
              <Chip
                label={`${recipe.cookingTime} min`}
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "transparent",
                  height: "25px",
                  fontWeight: "500",
                }}
                className="dark:text-white"
              />
            </div>
            <div className="w-full flex justify-start items-center bg-[#F3F4F6] dark:bg-opacity-30 pl-[10px] rounded-[8px]">
              <IoSpeedometerOutline className="text-[.8rem] text-content-color -mr-[6px] z-10 italic" />
              <Chip
                label={recipe.preparationDifficulty}
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "transparent",
                  height: "25px",
                  fontWeight: "500",
                }}
                className="dark:text-white"
              />
            </div>
          </div>
          <FilterBar
            label="Preferred meal time"
            data={recipe.preferredMealTime}
          />
          <FilterBar
            label="Health condition"
            data={recipe.medical_condition.chronicDiseases}
          />
          <FilterBar
            label="Dietary preferences"
            data={recipe.medical_condition.dietary_preferences}
          />
          <FilterBar
            label="Allergies"
            data={recipe.medical_condition.allergies}
          />
        </div>
        <h3 className="w-full leading-5 text-slate-500 text-[.9rem] mt-3">
          {recipe.description}
        </h3>

        <div className="w-full flex flex-col justify-start items-start mt-5">
          <h3 className="font-semibold mb-1">Macro-nutrients</h3>
          <div
            className="flex overflow-x-auto justify-start items-center gap-1 w-full"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            ref={scrollableDivRef}
            onWheel={handleWheel}
          >
            <CircularProgress
              color={getCalorieColor(recipe.nutrition.calories)}
              value={recipe.nutrition.calories}
              maxValue={1000}
              image={FireIcon}
              nutrient="Calorie"
              unit="Kcal"
            />
            <CircularProgress
              color={getProteinColor(recipe.nutrition.protein_g)}
              value={recipe.nutrition.protein_g}
              maxValue={50}
              image={ProteinIcon}
              nutrient="Protein"
              unit="g"
            />
            <CircularProgress
              color={getFatColor(recipe.nutrition.fat_total_g)}
              value={recipe.nutrition.fat_total_g}
              maxValue={100}
              image={FatIcon}
              nutrient="Fat"
              unit="g"
            />
            <CircularProgress
              color={getCarbsColor(recipe.nutrition.fat_total_g)}
              value={recipe.nutrition.carbohydrates_total_g}
              maxValue={100}
              image={CarbsIcon}
              nutrient="Carbs"
              unit="g"
            />
            <CircularProgress
              color={getFiberColor(recipe.nutrition.fat_total_g)}
              value={recipe.nutrition.fiber_g}
              maxValue={100}
              image={FiberIcon}
              nutrient="Fiber"
              unit="g"
            />
          </div>
          {(recipe.nutrition.calories !== 0 ||
            recipe.nutrition.protein_g !== 0 ||
            recipe.nutrition.fat_total_g !== 0 ||
            recipe.nutrition.carbohydrates_total_g !== 0 ||
            recipe.nutrition.fiber_g !== 0) && (
            <div className="w-full p-5">
              <PieChart pieChartData={pieChartData} />
            </div>
          )}
        </div>
        <div className="w-full flex flex-col justify-start items-start mt-5 gap-2">
          <h3 className="font-semibold mb-1">Ingredients</h3>
          {recipe.ingredients.map((ingredient, index) => {
            return (
              <div
                key={index}
                className="flex justify-start items-center leading-none gap-1 text-slate-400"
              >
                <img
                  src={
                    ingredientImages[index] !== undefined
                      ? ingredientImages[index]
                      : IngredientDefaultImage
                  }
                  alt="pic"
                  className={`min-w-8 w-8 ${
                    ingredientImages[index] === undefined &&
                    "rounded-full p-[5px] shadow-md bg-neutral-200"
                  }`}
                />
                <GoDotFill className="text-[.7rem] ml-[6px] mr-1 text-slate-500" />
                {ingredient.name}( {ingredient.localName} )- {ingredient.amount}{" "}
                {ingredient.unit}
              </div>
            );
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
          {recommendedRecipes?.length !== 0 ? (
            <div
              className="flex overflow-x-scroll justify-start items-center gap-4 w-full pb-8 px-3"
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
          ) : (
            <div className="w-full flex justify-center">
              <img
                src={EmptyListIcon}
                alt="pic"
                className="w-[75%] sm:w-[50%]"
              />
            </div>
          )}
        </div>

        <div className="w-full flex flex-col justify-start items-start mt-5">
          <ModeratorComment moderator={recipe.moderator} />
          <h3 className="font-semibold mb-1">Comments {recipe.totalReviews}</h3>
          {reviews?.map((review, index) => (
            <Comment key={index} comments={review as IReview} />
          ))}
        </div>
        <form
          className="w-full flex flex-col justify-start items-start gap-3"
          onSubmit={addComment}
        >
          <Rating
            name="simple-controlled"
            size="small"
            value={value}
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              newValue: number | null
            ) => {
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
            className={`w-full py-[10px] bg-[#F9FAFB] dark:bg-neutral-800 leading-none text-[1rem] px-4 border outline-none rounded-lg border-[#D1D5DB] dark:border-neutral-700`}
          />
          {!showCommentButton && (
            <p className="text-yellow-300 text-[.8rem] leading-none mb-1 -mt-2">
              {value === 0 && newComment.trim() !== "" && "Please fill retting"}
              {newComment.trim() === "" && value !== 0 && "Please fill comment"}
              {newComment.trim() === "" &&
                value === 0 &&
                "Please fill retting and comment"}
            </p>
          )}
          {createLoading ? (
            <button
              type="submit"
              className={`flex justify-center items-center gap-2 ${
                showCommentButton
                  ? "w-full h-[52px] bg-content-color mb-5 text-white rounded-lg"
                  : "w-full py-[8px] bg-neutral-300 text-neutral-500 mb-5"
              }`}
              disabled={false}
            >
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
              className={`${
                showCommentButton
                  ? "w-full h-[52px] bg-content-color mb-5 text-white rounded-lg"
                  : "w-full h-[52px] bg-[#5f9482] text-white rounded-lg mb-5"
              }`}
              disabled={!showCommentButton}
            >
              Comment
            </button>
          )}
        </form>
      </div>
    );
  }
}

export default RecipeDetail;
