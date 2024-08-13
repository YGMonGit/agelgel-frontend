import React from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";

function Search() {
  return (
    <div className="w-full px-5 flex justify-center items-center gap-2 mt-4">
      <div className="flex justify-center items-center flex-grow py-3 bg-[#F9FAFB] leading-none text-[1rem] px-5 border outline-none rounded-lg border-[#D1D5DB] gap-1">
        <IoSearchOutline className="text-slate-500 text-[1.2rem]" />
        <input className="border-none outline-none leading-6 bg-transparent flex-grow" placeholder="Search" />
        <IoCloseOutline className="text-slate-500 text-[1.2rem]" />
      </div>
      <button className="flex justify-center items-center h-full bg-content-color leading-none text-[1rem] px-3 border outline-none rounded-lg border-[#D1D5DB] gap-1">
        <IoSearchOutline className="text-white text-[1.6rem]" />
      </button>
    </div>
  );
}

export default Search;
