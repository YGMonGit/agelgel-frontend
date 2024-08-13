import React from "react";
import PageHeader from "../components/PageHeader";
import Search from "../components/Search";
import FilterBar from "../components/FilterBar";
import { filterData, posts } from "../assets/data";
import DisplayCard from "../components/DisplayCard";
import { Post } from '../types/post';
import { IoAdd } from "react-icons/io5";

function Home() {
  return (
    <div className="w-full flex-wrap flex flex-col justify-start items-center relative">
      <PageHeader header="Good Morning, Yisehak!" detail="Browse through our suggestions." />
      <Search />
      <FilterBar data={filterData}/>
      <div className="w-full px-5 flex justify-evenly items-start gap-3 flex-wrap">
        {posts.map((post, index) => (
          <DisplayCard post={post as Post} key={index} />
        ))}
      </div>
      <button className="w-14 h-14 bg-content-color flex justify-center items-center rounded-full text-[2rem] text-white fixed bottom-10 right-5"><IoAdd /></button>
    </div>
  );
}

export default Home;
