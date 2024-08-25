import React, { useState } from 'react'
import MySpaceNav from '../components/MySpaceNav';
import PageHeader from '../components/PageHeader';
import DisplayCard from '../components/DisplayCard';
import { useGetMyRecipesQuery, useGetUserBookedRecipesQuery } from '../api/slices/user.slices';
import { ERecipeStatus } from '../api/types/recipe.type';

function MySpace() {

  const [spaceType, setSpaceType] = useState(true);
  const [postStatus, setPostStatus] = useState(ERecipeStatus.verified);

  const { data: myRecipes, isLoading: myRecipesIsLoading } = useGetMyRecipesQuery({ status: postStatus, skip: 0, limit: 10 }, {
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
      <div className='w-full px-5 flex justify-start items-center gap-2'>
        <button className='px-4 py-1 rounded-lg bg-content-color text-white outline-none border-none' onClick={() => setPostStatus(ERecipeStatus.verified)}>verified</button>
        <button className='px-4 py-1 rounded-lg bg-neutral-100 outline-none border-none' onClick={() => setPostStatus(ERecipeStatus.pending)}>pending</button>
        <button className='px-4 py-1 rounded-lg bg-red-600 text-white outline-none border-none' onClick={() => setPostStatus(ERecipeStatus.rejected)}>rejected</button>
      </div>
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