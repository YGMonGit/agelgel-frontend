import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/agelgel-logo.png";
import ArrowUpRight from "../assets/icons/arrow-up-right.png";
import HelpIcon from "../assets/icons/help-icon.png";
import CircleDropdown from "./CircleDropdown";
import DetailNavDropdown from "./DetailNavDropdown";
import { editPostUrl, editUserUrl, homeUrl, loginUrl, mySpaceUrl, postUrl, recipeDetailUrl, signUpUrl } from "../assets/data";

import { SlClose, SlArrowLeft } from "react-icons/sl";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const getRightContent = () => {
    if (location.pathname === homeUrl) {
      return (<CircleDropdown />);
    } else if (location.pathname === signUpUrl) {
      return (
        <button className="text-content-color text-[1.1rem] flex items-end font-[60l0] bg-red-30 leading-none gap-1">
          Need Help? <img src={HelpIcon} alt="arrow-up-right" className="w-[1.1rem] h-[1.1rem]" />
        </button>
      );
    } else if (location.pathname === loginUrl) {
      return (
        <button className="text-content-color text-[1.1rem] flex items-end font-[60l0] bg-red-30 leading-none gap-1" onClick={() => navigate(signUpUrl)}>
          Register <img src={ArrowUpRight} alt="arrow-up-right" className="w-[1.1rem] h-[1.1rem]" />
        </button>
      );
    } else if (location.pathname === postUrl) {
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="rounded-full w-9 h-9 flex justify-center items-center cursor-pointer">
              <SlClose className="text-red-600 text-[1.4rem]" />
            </div> 
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white w-[90%] rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[1.6rem]">Discard New Recipe</AlertDialogTitle>
              <AlertDialogDescription className="text-[1.2rem] text-slate-400">
                Are you sure you want to delete this recipe?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-[1.2rem] h-[56px] rounded-xl">No, I've changed my mind</AlertDialogCancel>
              <AlertDialogAction className="text-[1.2rem] h-[56px] bg-red-700 rounded-xl">
                Yes, delete it
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    } else if (location.pathname.startsWith(recipeDetailUrl)) {
      return (<DetailNavDropdown />);
    } else { return null; }
  };

  const getLeftContent = () => {
    if (location.pathname === homeUrl || location.pathname === loginUrl || location.pathname === signUpUrl || location.pathname === postUrl) {
      return (
        <div className="flex justify-start items-center gap-2 select-none">
          <img src={logo} alt="agelgel logo" className="w-[23.91px] h-[28px]" />
          <p className="text-[1.2rem] font-semibold">Agelgel</p>
        </div>
      );
    } else if (location.pathname.startsWith(recipeDetailUrl) || location.pathname.startsWith(editPostUrl) || location.pathname.startsWith(editUserUrl) || location.pathname === mySpaceUrl) {
      return (
        <div className="flex justify-start items-center gap-5 py-2" onClick={() => navigate(homeUrl)}>
          <SlArrowLeft className="text-content-color text-[1rem]"/>
          <p className="text-[1.2rem] font-semibold leading-none">Back</p>
        </div>
      );
    } else { return null; }
  };

  return (
    <div className="w-full h-[56px] py-[14px] px-5 border-b fixed top-0 left-0 right-0 bg-white flex justify-between items-center z-50">
      <div className="flex items-end">{getLeftContent()}</div>
      <div className="flex items-end">{getRightContent()}</div>
    </div>
  );
}

export default Navbar;