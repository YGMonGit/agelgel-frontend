import React, { useState } from 'react'
import MySpaceNav from '../components/MySpaceNav';
import PageHeader from '../components/PageHeader';
import { filterData, posts } from "../assets/data";
import DisplayCard from '../components/DisplayCard';
import { Post } from '../types/post';

function MySpace() {

  const [spaceType, setSpaceType] = useState(true);

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
          {/* {posts.map((post, index) => (
            <DisplayCard post={post as Post} key={index} />
          ))} */}
        </div>
      ) : (
        <div className="w-full px-5 flex justify-evenly items-start gap-3 flex-wrap">
          {/* {posts.map((post, index) => (
            <DisplayCard post={post as Post} key={index} />
          ))} */}
        </div>
      )}
    </div>
  )
}

export default MySpace