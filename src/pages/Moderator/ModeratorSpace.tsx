import React, { useState } from "react";
import MySpaceNav from "../../components/MySpaceNav";
import PageHeader from "../../components/PageHeader";
import DisplayCard from "../../components/DisplayCard";
import {
  useGetMyRecipesQuery,
} from "../../api/slices/user.slices";
import { ERecipeStatus } from "../../api/types/recipe.type";

import EmptyListIcon from "../../assets/images/empty-list.png";

function ModeratorSpace() {
  const [spaceType, setSpaceType] = useState(true);
  const [postStatus, setPostStatus] = useState(ERecipeStatus.verified);

  const { data: myRecipes, isLoading: myRecipesIsLoading } =
    useGetMyRecipesQuery(
      { status: postStatus, skip: 0, limit: 10 },
      {
        skip: !spaceType,
      }
    );

  const skeletonMyRecipeCount = myRecipesIsLoading
    ? 10
    : myRecipes?.length || 0;

  return (
    <div className="w-full flex-grow flex-wrap flex flex-col justify-start items-center relative mb-5">
      {/* <MySpaceNav spaceType={spaceType} setSpaceType={setSpaceType} /> */}
      <PageHeader header="Moderated Recipes" detail="Your recipe contributions." />

      <div className="w-full px-5 flex justify-start items-center gap-2" style={{ display: spaceType ? "flex" : "none" }}>
        <button
          className="px-4 py-1 rounded-lg text-white outline-none border-none"
          style={{
            backgroundColor: postStatus === ERecipeStatus.verified ? "#15803d" : "#F3F4F6",
            color: postStatus === ERecipeStatus.verified ? "#fff" : "#15803d",
          }}
          onClick={() => setPostStatus(ERecipeStatus.verified)}
        >
          verified
        </button>
        <button
          className="px-4 py-1 rounded-lg text-white outline-none border-none"
          style={{
            backgroundColor: postStatus === ERecipeStatus.rejected ? "#15803d" : "#F3F4F6",
            color: postStatus === ERecipeStatus.rejected ? "#fff" : "#15803d",
          }}
          onClick={() => setPostStatus(ERecipeStatus.rejected)}
        >
          rejected
        </button>
      </div>

      {/* {spaceType ? ( */}
        {myRecipes?.length !== 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full px-5 mt-5">
            {myRecipesIsLoading
              ? Array.from({ length: skeletonMyRecipeCount }).map(
                (_, index) => (
                  <DisplayCard post={null} key={`skeleton-${index}`} />
                )
              )
              : myRecipes?.map((post, index) => (
                <DisplayCard post={post} key={index} />
              ))}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center flex-grow">
            <img src={EmptyListIcon} alt="pic" className="w-[75%] sm:w-[50%]" />
          </div>
        )}
    </div>
  );
}

export default ModeratorSpace;