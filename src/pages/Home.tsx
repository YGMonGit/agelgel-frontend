import React, { useEffect, useState, useCallback, useRef } from "react";
import PageHeader from "../components/PageHeader";
import FilterBarActive from "../components/FilterBarActive";
import { postUrl } from "../assets/data";
import DisplayCard from "../components/DisplayCard";
import { IoAdd } from "react-icons/io5";
import { useGetRecipesQuery } from "../api/slices/recipe.slices";
import { useNavigate } from "react-router-dom";
import EmptyListIcon from "../assets/images/empty-list.png";
import { useGetUserQuery } from "../api/slices/user.slices";
import {
  EPreferredMealTime,
  EPreferredMealTimeFilter,
  IRecipe,
} from "../api/types/recipe.type";
import ClipLoader from "react-spinners/ClipLoader";

function Home() {
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
  const limit = 5; // Number of items to load per page

  const {
    data: recommendedRecipes,
    isFetching,
    isUninitialized,
    refetch,
  } = useGetRecipesQuery({
    skip: (page - 1) * limit,
    limit: limit,
    filter: filter,
  });

  const { data: user } = useGetUserQuery();

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
    <div className="w-full flex-wrap flex-grow flex flex-col justify-start items-center relative min-h-[100%-56px]">
      <PageHeader
        header={`Good Morning, ${user?.first_name}!`}
        detail="Browse through our suggestions."
      />
      <div className="w-full px-5">
        <FilterBarActive
          data={["all", ...Object.values(EPreferredMealTime)]}
          selectedChip={filter}
          setSelectedChip={(filter) => {
            setFilter(filter as EPreferredMealTimeFilter);
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

      <div className="w-full flex justify-end items-center fixed bottom-0 px-2 pb-5">
        <div
          className="w-14 h-14 bg-content-color flex justify-center items-center rounded-full text-[2rem] text-white"
          onClick={() => navigate(postUrl)}
        >
          <IoAdd />
        </div>
      </div>
    </div>
  );
}

export default Home;