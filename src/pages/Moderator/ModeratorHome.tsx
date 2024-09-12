import React, { useEffect, useState, useCallback, useRef } from "react";
import PageHeader from "../../components/PageHeader";
import FilterBarActive from "../../components/FilterBarActive";
import { useGetModeratorRecipesQuery } from "../../api/slices/recipe.slices";
import { useNavigate } from "react-router-dom";
import EmptyListIcon from "../../assets/images/empty-list.png";
import { useGetModeratorQuery } from "../../api/slices/moderator.slices";
import { EPreferredMealTimeFilter, IRecipe } from "../../api/types/recipe.type";
import ModeratorNav from "../../components/ModeratorNav";
import ModeratorUserList from "./ModeratorUserList";
import ModeratorIngredientList from "./ModeratorIngredientList";
import DisplayCard from "../../components/DisplayCard";
import ClipLoader from "react-spinners/ClipLoader";

function ModeratorHome() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [allRecipes, setAllRecipes] = useState<IRecipe[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState<EPreferredMealTimeFilter>(
    EPreferredMealTimeFilter.all
  );
  const [spaceType, setSpaceType] = useState<"recipe" | "user" | "ingredient">("recipe");
  const limit = 5; // Number of items to load per page

  const {
    data: recommendedRecipes,
    isFetching,
    isUninitialized,
    refetch,
  } = useGetModeratorRecipesQuery({
    skip: (page - 1) * limit,
    limit: limit,
    filter: filter,
  });

  const { data: user } = useGetModeratorQuery();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastRecipeElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore]
  );

  useEffect(() => {
    if (recommendedRecipes) {
      setAllRecipes((prevRecipes) => [...prevRecipes, ...recommendedRecipes]);
      setHasMore(recommendedRecipes.length === limit);
    }
  }, [recommendedRecipes, limit]);

  useEffect(() => {
    setPage(1);
    setAllRecipes([]);
    setHasMore(true);
  }, [filter]);

  useEffect(() => {
    if (!isFetching && !isUninitialized) refetch();
  }, [filter, page, isUninitialized, refetch, isFetching]);

  return (
    <div className="w-full flex-wrap flex flex-grow flex-col justify-start items-center relative mt-12 min-h-[100%-56px]">
      <PageHeader
        header={`Good Morning, ${user?.first_name}!`}
        detail="Browse through our suggestions."
      />

      <ModeratorNav spaceType={spaceType} setSpaceType={setSpaceType} />

      {spaceType === "recipe" && (
        <div className="w-full">
        <div className="w-full px-5">
          <FilterBarActive
            data={Object.values(EPreferredMealTimeFilter)}
            selectedChip={filter}
            setSelectedChip={(newFilter) => {
              setFilter(newFilter as EPreferredMealTimeFilter);
            }}
          />
        </div>
          {allRecipes.length !== 0 ? (
            <div className="w-full flex flex-col justify-start items-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full px-5 mb-5">
                {allRecipes.map((post, index) => {
                  if (allRecipes.length === index + 1) {
                    return (
                      <div ref={lastRecipeElementRef} key={index}>
                        <DisplayCard post={post} />
                      </div>
                    );
                  } else {
                    return <DisplayCard post={post} key={index} />;
                  }
                })}
              </div>
              {isFetching && (
                <div className="w-full px-5 py-6 flex justify-center items-center gap-2">
                  <ClipLoader
                    color={"var(--content-color)"}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  <p className="text-[1rem] italic">Loading...</p>
                </div>
              )}
            </div>
          ) : isFetching ? (
            <div className="w-full flex flex-col justify-start items-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full px-5 mb-5">
                {Array.from({ length: limit }).map((_, index) => (
                  <DisplayCard post={null} key={`skeleton-${index}`} />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center flex-grow">
              <img src={EmptyListIcon} alt="pic" className="w-[75%] sm:w-[50%]" />
            </div>
          )}
        </div>
      )}
      {spaceType === "user" && (
        <div className="w-full flex flex-grow items-start px-5">
          <ModeratorUserList />
        </div>
      )}
      {spaceType === "ingredient" && (
        <div className="w-full flex flex-grow items-start px-5">
          <ModeratorIngredientList />
        </div>
      )}
    </div>
  );
}

export default ModeratorHome;