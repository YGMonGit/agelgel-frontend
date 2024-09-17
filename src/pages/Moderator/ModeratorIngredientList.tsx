import React, { useEffect, useState } from "react";

import EmptyListIcon from "../../assets/images/empty-list.png";
import IngredientCard from "../../components/IngredientCard";
import { useGetIngredientsQuery } from "../../api/slices/ingredient.slices";

import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { moderatorAddIngredientUrl } from "../../assets/data";
import SpoonacularClient from "../../api/SpoonacularClient";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

function ModeratorIngredientList() {
  const navigate = useNavigate();

  const pageSize = 10
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });

  const [ingredientImages, setIngredientImages] = useState<string[]>([]);


  const {
    data: ingredientList,
    isLoading,
    refetch,
    isFetching,
    isUninitialized,
  } = useGetIngredientsQuery({
    skip: pagination.skip,
    limit: pagination.limit,
  });

  useEffect(() => {
    if (ingredientList) {
      const fetchIngredientImages = async () => {
        let images = await Promise.all(
          ingredientList.map(async (ingredient) => {
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
  }, [ingredientList]);

  const skeletonCount = isLoading
    ? pagination.limit
    : ingredientList?.length || 0;

  
  const pageChange = ({ direction }: { direction: string }) => {

    if (direction === "back") {
      setPagination((prev) => {
        if (prev.skip - pageSize < 0) {
          return ({
            skip: 0,
            limit: pageSize,
          });
        }
        else
          return ({
            skip: prev.skip - pageSize,
            limit: prev.limit - pageSize,
          });
      });
    } else {
      setPagination((prev) => ({
        skip: prev.skip + pageSize,
        limit: prev.limit + pageSize,
      }));
    }
  };
  return (
    <div className="flex flex-col h-full justify-start items-center w-full pt-3">
      {ingredientList?.length !== 0 ? (
        <div className="w-full flex flex-col justify-start items-center">
          <div className="flex flex-col h-full justify-start items-center w-full pt-3 gap-2">
            {isLoading
              ? Array.from({ length: skeletonCount }).map((_, index) => (
                <IngredientCard ingredient={null} key={`skeleton-${index}`} />
              ))
              : ingredientList?.map((ingredient, index) => (
                <IngredientCard ingredientImage={ingredientImages[index]} ingredient={ingredient} key={index} />
              ))}
          </div>
          {!isFetching && (
            <div className="w-full p-5 flex justify-center items-center gap-3 mb-5 text-[1rem] select-none z-20">
              <button
                className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 text-slate-500 text-[.9rem]"
                onClick={() => pageChange({ direction: "back" })}
              >
                <FaChevronLeft className="text-content-color text-[1.2rem]" />{" "}
                Back
              </button>
              <button
                className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 text-slate-500 text-[.9rem]"
                onClick={() => pageChange({ direction: "forward" })}
              >
                Next{" "}
                <FaChevronRight className="text-content-color text-[1.2rem]" />
              </button>
            </div>
          )}
        </div>
      ) : (
        // <div className="w-full flex justify-center items-center flex-grow">
        //   <img src={EmptyListIcon} alt="pic" className="w-[75%] sm:w-[50%]" />
        // </div>
        <div className="w-full flex flex-col justify-center items-center flex-grow">
          <img src={EmptyListIcon} alt="pic" className="w-[75%] sm:w-[50%]" />
          <div className="w-full px-5 flex justify-center items-center gap-3 mb-5 text-[1rem] select-none z-20">
            <button
              className="flex justify-center items-center border border-content-color rounded-lg p-2 px-5 shadow-md bg-slate-50 text-slate-500 text-[.9rem]"
              onClick={() => pageChange({ direction: "back" })}
            >
              <FaChevronLeft className="text-content-color text-[1.2rem]" />{" "}
              Back
            </button>
            
          </div>
        </div>
      )}
      <div className="w-full flex justify-end items-center sticky bottom-0 px-1 pb-5">
        <div
          className="w-14 h-14 bg-content-color flex justify-center items-center rounded-full text-[2rem] text-white"
          onClick={() => navigate(moderatorAddIngredientUrl)}
        >
          <IoAdd />
        </div>
      </div>
    </div>
  );
}

export default ModeratorIngredientList;
