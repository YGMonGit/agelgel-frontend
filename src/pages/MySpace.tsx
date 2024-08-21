import React, { useState } from 'react'
import MySpaceNav from '../components/MySpaceNav';
import PageHeader from '../components/PageHeader';
import DisplayCard from '../components/DisplayCard';
import { useGetMyRecipesQuery, useGetUserBookedRecipesQuery } from '../api/slices/user.slices';
import { ERecipeStatus } from '../api/types/recipe.type';

function MySpace() {

  const [spaceType, setSpaceType] = useState(true);

  const { data: myRecipes, isLoading: myRecipesIsLoading } = useGetMyRecipesQuery({ status: ERecipeStatus.verified, skip: 0, limit: 10 }, {
    skip: !spaceType
  });
  const { data: myBookedRecipes, isLoading: myBookedRecipesIsLoading } = useGetUserBookedRecipesQuery({ skip: 0, limit: 10 }, {
    skip: spaceType
  });

  const mainHeader = spaceType ? "My Recipes" : "Saved Recipes"
  const subHeader = spaceType ? "Your recipe contributions." : "The recipe suggestions you took to heart."

  return (
    <div className="w-full flex-wrap flex flex-col justify-start items-center relative">
      <MySpaceNav spaceType={spaceType} setSpaceType={setSpaceType} />
      <PageHeader
        header={mainHeader}
        detail={subHeader}
      />
      {spaceType ? (
        <div className="w-full px-5 flex justify-evenly items-start gap-3 flex-wrap">
          {myRecipes?.map((post, index) => (
            <DisplayCard post={post} key={index} />
          ))}
        </div>
      ) : (
        <div className="w-full px-5 flex justify-evenly items-start gap-3 flex-wrap">
          {myBookedRecipes?.map((post, index) => (
            <DisplayCard post={post} key={index} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MySpace