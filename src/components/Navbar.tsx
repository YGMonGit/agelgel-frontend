import React from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/images/agelgel-logo.png";
import ArrowUpRight from "../assets/icons/arrow-up-right.png";
import HelpIcon from "../assets/icons/help-icon.png";
import CircleDropdown from "./CircleDropdown";
import DetailNavDropdown from "./DetailNavDropdown";
import {
  editPostUrl,
  editUserUrl,
  homeUrl,
  searchUrl,
  welcomeUrl,
  loginUrl,
  mySpaceUrl,
  postUrl,
  recipeDetailUrl,
  signUpUrl,
  moderatorHomeUrl,
  moderatorLoginUrl,
  moderatorSearchUrl,
  moderatorSignUpUrl,
  moderatorRecipeDetailUrl,
  moderatorSpaceUrl,
  moderatorAddIngredientUrl,
  moderatorEditIngredientUrl,
  personalDataUrl,
} from "../assets/data";

import { SlClose, SlArrowLeft } from "react-icons/sl";
import { BiSolidUserDetail } from "react-icons/bi";

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
import { IoSearchOutline } from "react-icons/io5";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const getRightContent = () => {
    if (location.pathname === homeUrl || location.pathname === moderatorHomeUrl) {
      return (
        <div className="flex justify-center items-center gap-2">
          {location.pathname === homeUrl && (
            <NavLink
              to={personalDataUrl}
              className="w-9 h-9 border border-content-color flex justify-center items-center rounded-full text-[2rem] text-content-color"
              onClick={() => {
                window.scrollTo({ top: 0 });
              }}
            >
              <BiSolidUserDetail width={25} height={25} className="text-[1.3rem]" />
            </NavLink>
          )}
          <NavLink
            to={location.pathname === homeUrl ? searchUrl : moderatorSearchUrl}
            className="w-9 h-9 bg-content-color flex justify-center items-center rounded-full text-[2rem] text-white"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          >
            <IoSearchOutline width={25} height={25} className="text-[1.3rem]" />
          </NavLink>
          <CircleDropdown />
        </div>
      );
    } else if (location.pathname === signUpUrl || location.pathname === moderatorSignUpUrl) {
      return (
        <NavLink
          to="#"
          className="text-content-color text-[1.1rem] flex items-end font-[600] leading-none gap-1"
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
        >
          Need Help?{" "}
          <img
            src={HelpIcon}
            alt="help icon"
            className="w-[1.1rem] h-[1.1rem]"
          />
        </NavLink>
      );
    } else if (location.pathname === searchUrl || location.pathname === moderatorSearchUrl) {
      return <CircleDropdown />;
    } else if (location.pathname === loginUrl || location.pathname === moderatorLoginUrl) {
      return (
        <NavLink
          to={location.pathname.startsWith("/moderator") ? moderatorSignUpUrl : signUpUrl}
          className="text-content-color text-[1.1rem] flex items-end font-[600] leading-none gap-1"
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
        >
          Register{" "}
          <img
            src={ArrowUpRight}
            alt="arrow-up-right"
            className="w-[1.1rem] h-[1.1rem]"
          />
        </NavLink>
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
              <AlertDialogTitle className="text-[1.6rem]">
                Discard New Recipe
              </AlertDialogTitle>
              <AlertDialogDescription className="text-[1.2rem] text-slate-400">
                Are you sure you want to delete this recipe?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-[1.2rem] h-[56px] rounded-xl">
                No, I've changed my mind
              </AlertDialogCancel>
              <AlertDialogAction
                className="text-[1.2rem] h-[56px] bg-red-700 rounded-xl"
                onClick={() => {
                  navigate(homeUrl);
                  window.scrollTo({ top: 0 });
                }}
              >
                Yes, delete it
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    } else if (location.pathname.startsWith(recipeDetailUrl)) {
      return <DetailNavDropdown />;
    } else {
      return null;
    }
  };

  const getLeftContent = () => {
    if (
      location.pathname === homeUrl ||
      location.pathname === moderatorHomeUrl ||
      location.pathname === searchUrl ||
      location.pathname === moderatorSearchUrl ||
      location.pathname === loginUrl ||
      location.pathname === moderatorLoginUrl ||
      location.pathname === signUpUrl ||
      location.pathname === moderatorSignUpUrl ||
      location.pathname === postUrl
    ) {
      return (
        <NavLink
          to={location.pathname.startsWith("/moderator") ? moderatorHomeUrl : homeUrl}
          className="flex justify-start items-center gap-2 select-none"
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
        >
          <img src={logo} alt="agelgel logo" className="h-[28px]" />
          <p className="text-[1.2rem] font-semibold">Agelgel</p>
        </NavLink>
      );
    } else if (
      location.pathname.startsWith(recipeDetailUrl) ||
      location.pathname.startsWith(moderatorRecipeDetailUrl) ||
      location.pathname.startsWith(editPostUrl) ||
      location.pathname.startsWith(editUserUrl) ||
      location.pathname === mySpaceUrl ||
      location.pathname === personalDataUrl ||
      location.pathname === moderatorSpaceUrl ||
      location.pathname === moderatorAddIngredientUrl ||
      location.pathname.startsWith(moderatorEditIngredientUrl) 
    ) {
      return (
        <NavLink
          to="#"
          className="flex justify-start items-center gap-5 py-2 select-none cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
            window.scrollTo({ top: 0 });
          }}
        >
          <SlArrowLeft className="text-content-color text-[1rem]" />
          <p className="text-[1.2rem] font-semibold leading-none">Back</p>
        </NavLink>
      );
    } else {
      return null;
    }
  };

  return (
    <nav
      className={`w-full flex justify-center items-center bg-red-30 ${location.pathname !== homeUrl && location.pathname !== moderatorHomeUrl && "shadow-md"} fixed top-0 left-0 right-0 z-50 bg-white`}
    >
      <div
        className={`w-full max-w-[800px] h-[56px] py-[14px] px-5 bg-white flex justify-between items-center z-50`}
      >
        <div className="flex items-end">{getLeftContent()}</div>
        <div className="flex items-end">{getRightContent()}</div>
      </div>
    </nav>
  );
}

export default Navbar;