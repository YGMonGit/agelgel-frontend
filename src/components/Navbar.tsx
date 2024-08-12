import React from "react";
import logo from "../assets/images/agelgel-logo.png";
import ArrowUpRight from "../assets/icons/arrow-up-right.png";

function Navbar() {
  return (
    <div className="w-full h-[56px] py-[14px] px-5 border-b flex justify-between items-center">
      <div className="flex justify-start items-center gap-2">
        <img src={logo} alt="agelgel logo" className="w-[23.91px] h-[28px]" />
        <p className="text-[1.2rem] font-semibold">Agelgel</p>
      </div>
      <button className="text-content-color text-[1.1rem] flex items-end font-[60l0] bg-red-30 leading-none gap-1">
        Register <img src={ArrowUpRight} alt="arrow-up-right" className="w-[1.1rem] h-[1.1rem]:"/>
      </button>
    </div>
  );
}

export default Navbar;
