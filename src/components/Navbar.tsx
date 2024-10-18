import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/images/agelgel-logo.png";
import ArrowUpRight from "../assets/icons/arrow-up-right.png";
import HelpIcon from "../assets/icons/help-icon.png";
import CircleDropdown from "./CircleDropdown";
import DetailNavDropdown from "./DetailNavDropdown";
import {
  editPostUrl,
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
  mealPlannerUrl,
  editUserInfoUrl,
  moderatorEditInfoUrl,
  updateHealthConditionUrl,
  editPersonalDataUrl,
  notificationsUrl,
  moderatorChangePasswordUrl,
  changePasswordUrl,
  updatePasswordUrl,
  moderatorUpdatePasswordUrl,
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
import { MdAdd, MdClose, MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useUpdateStatsMutation } from "../api/slices/mealPlanner.slices";
import AlertDialogBox from "./AlertDialogBox";

interface NavbarProps {
  toggleDarkMode?: () => void;
  dark?: boolean;
}

function Navbar({ toggleDarkMode, dark }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [changeWeight, { isLoading, isSuccess }] = useUpdateStatsMutation();

  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [openDialogBoxTwo, setOpenDialogBoxTwo] = useState(false);

  const updateWeight = async () => {
    try {
      console.log("Weight Updating");
      await changeWeight({ statsData: { weight: weight } });
      setOpenDialogBox(false);
      console.log("Weight Updated");
    } catch (error) {
      console.log(error);
    }
  };

  const [weight, setWeight] = useState<number>(0);
  const onWeightChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWeight(Number.parseInt(e.target.value));

  useEffect(() => {
    console.log("weight update success");
    setWeight(0);
  }, [isSuccess]);

  const getRightContent = () => {
    if (
      location.pathname === homeUrl ||
      location.pathname === moderatorHomeUrl
    ) {
      return (
        <div className="flex justify-center items-center gap-2">
          {location.pathname === homeUrl && (
            <NavLink
              to={mealPlannerUrl}
              className="w-9 h-9 border border-content-color flex justify-center items-center rounded-full text-[2rem] text-content-color"
              onClick={() => {
                window.scrollTo({ top: 0 });
              }}
            >
              <BiSolidUserDetail
                width={25}
                height={25}
                className="text-[1.3rem]"
              />
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
          <CircleDropdown toggleDarkMode={toggleDarkMode} dark={dark} />
        </div>
      );
    } else if (
      location.pathname === signUpUrl ||
      location.pathname === moderatorSignUpUrl
    ) {
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
    } else if (
      location.pathname === searchUrl ||
      location.pathname === moderatorSearchUrl
    ) {
      return <CircleDropdown toggleDarkMode={toggleDarkMode} dark={dark} />;
    } else if (location.pathname === mealPlannerUrl) {
      return (
        <div className="flex justify-center items-center gap-1">
          <NavLink
            to={editPersonalDataUrl}
            className="text-content-color text-[1.1rem] flex items-end font-[600] leading-none gap-1"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          >
            <MdEdit className="text-[1.6rem]" />
          </NavLink>
          <div
            className="text-content-color text-[1.1rem] flex items-end font-[600] leading-none cursor-pointer gap-1"
            onClick={() => {
              setOpenDialogBox(true);
            }}
          >
            <IoMdAdd className="text-[1.6rem]" />
          </div>
          {openDialogBox && (
            <AlertDialogBox
              title="Weight"
              buttonContent="Update Weight"
              closeDialog={() => {
                setOpenDialogBox(false);
              }}
              handleAction={updateWeight}
              isLoading={isLoading}
              single={true}
            >
              <input
                type="number"
                value={weight}
                onChange={onWeightChange}
                placeholder="weight"
                className="py-[10px] mt-4 w-full bg-[#F9FAFB] dark:bg-neutral-900 leading-none text-[1rem] px-4 border outline-none rounded-lg border-[#D1D5DB] dark:border-neutral-800"
              />
            </AlertDialogBox>
          )}
        </div>
      );
    } else if (
      location.pathname === loginUrl ||
      location.pathname === moderatorLoginUrl ||
      location.pathname === changePasswordUrl ||
      location.pathname === moderatorChangePasswordUrl
    ) {
      return (
        <NavLink
          to={
            location.pathname.startsWith("/moderator")
              ? moderatorSignUpUrl
              : signUpUrl
          }
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
        <>
          <div
            className="rounded-full w-9 h-9 flex justify-center items-center cursor-pointer"
            onClick={() => {
              setOpenDialogBoxTwo(true);
            }}
          >
            <SlClose className="text-red-600 text-[1.4rem]" />
          </div>
          {openDialogBoxTwo && (
            <AlertDialogBox
              title="Discard New Recipe"
              detail="Are you sure you want to delete this recipe?"
              cancelContent="No, I've changed my mind"
              buttonContent="Yes, delete it"
              closeDialog={() => {
                setOpenDialogBoxTwo(false);
              }}
              handleClick={() => {
                setOpenDialogBoxTwo(false);
                navigate(homeUrl);
                window.scrollTo({ top: 0 });
              }}
              isLoading={isLoading}
            />
          )}
        </>
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
      location.pathname === changePasswordUrl ||
      location.pathname === moderatorChangePasswordUrl ||
      location.pathname === "/user/page-404" ||
      location.pathname === postUrl
    ) {
      return (
        <NavLink
          to={
            location.pathname.startsWith("/moderator")
              ? moderatorHomeUrl
              : homeUrl
          }
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
      location.pathname === mySpaceUrl ||
      location.pathname === personalDataUrl ||
      location.pathname === moderatorSpaceUrl ||
      location.pathname === moderatorAddIngredientUrl ||
      location.pathname === updateHealthConditionUrl ||
      location.pathname === editUserInfoUrl ||
      location.pathname === updatePasswordUrl ||
      location.pathname === moderatorUpdatePasswordUrl ||
      location.pathname === editPersonalDataUrl ||
      location.pathname === notificationsUrl ||
      location.pathname === moderatorEditInfoUrl ||
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
    } else if(location.pathname === mealPlannerUrl) {
      return(
        <NavLink
          to="#"
          className="flex justify-start items-center gap-5 py-2 select-none cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            navigate(homeUrl);
            window.scrollTo({ top: 0 });
          }}
        >
          <SlArrowLeft className="text-content-color text-[1rem]" />
          <p className="text-[1.2rem] font-semibold leading-none">Back</p>
        </NavLink>
      );
    }else {
      return null;
    }
  };

  return (
    <nav
      className={`w-full flex justify-center items-center bg-red-30 ${
        location.pathname !== homeUrl &&
        location.pathname !== moderatorHomeUrl &&
        "shadow-md"
      } fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neutral-800`}
    >
      <div
        className={`w-full max-w-[800px] h-[56px] py-[14px] px-5 flex justify-between items-center z-50`}
      >
        <div className="flex items-end">{getLeftContent()}</div>
        <div className="flex items-end">{getRightContent()}</div>
      </div>
    </nav>
  );
}

export default Navbar;
