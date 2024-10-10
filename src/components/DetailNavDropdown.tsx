import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import QRCode from "react-qr-code";

import { Button } from "./ui/button";

import {
  useGetPrivateRecipeByIdQuery,
  useRemoveRecipeMutation,
} from "../api/slices/recipe.slices";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { editPostUrl } from "../assets/data";
import Drawer from "react-bottom-drawer";
import { RiCloseLargeLine } from "react-icons/ri";
import { LiaTelegram } from "react-icons/lia";
import { IoClipboardOutline } from "react-icons/io5";
import { LiaFacebookSquare } from "react-icons/lia";
import { FaWhatsapp } from "react-icons/fa";
import AlertDialogBox from "./AlertDialogBox";

function DetailNavDropdown() {
  const rID = useParams();
  const { data: recipe, isLoading: recipesLoading } =
    useGetPrivateRecipeByIdQuery(String(rID["id"]));
  const location = useLocation();
  const navigate = useNavigate();

  const [removeRecipe, { isLoading }] = useRemoveRecipeMutation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState<string>("https://example.com");

  useEffect(() => {
    if (recipe) {
      setValue(recipe.shareableLink);
    }
  }, [recipe]);

  const [openDialogBox, setOpenDialogBox] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShare = () => {
    // Assuming you have a recipeId variable
    const recipeId = "123"; // Replace this with your actual recipeId
    const recipeUrl = `https://yourwebsite.com/recipe/${recipeId}`;
    setValue(recipeUrl);
    console.log("Share");
    toggleDropdown();
  };

  const openDialog = () => {
    setOpenDialogBox(true);
  };
  const closeDialog = () => {
    setOpenDialogBox(false);
  };

  const handleDeletion = async () => {
    try {
      console.log("Recipe ID:", rID["id"]);
      await removeRecipe(String(rID["id"])).unwrap();
      closeDialog();
      console.log("Recipe removed successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error removing recipe:", error);
    }
  };

  const goToEdit = () => {
    navigate(`${editPostUrl}/${String(rID["id"])}`);
  };

  const [isVisible, setIsVisible] = React.useState(false);
  const openDrawer = React.useCallback(() => setIsVisible(true), []);
  const closeDrawer = React.useCallback(() => setIsVisible(false), []);

  return (
    <div className="relative">
      <div
        className="rounded-full w-9 h-9 flex justify-center items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <PiDotsThreeOutlineVerticalLight className="text-content-color text-[1.4rem]" />
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-10 right-0 bg-white dark:bg-neutral-800 shadow-lg border border-gray-300 dark:border-neutral-700 rounded-lg py-2 w-[110px]"
        >
          <ul className="space-y-1">
            <li
              className="hover:bg-gray-100 dark:hover:bg-neutral-700 dark:hover:bg-opacity-30 text-slate-500 w-full text-start p-1 px-3 cursor-pointer"
              onClick={openDrawer}
            >
              Share
            </li>
            <Drawer
              duration={250}
              hideScrollbars={true}
              onClose={closeDrawer}
              isVisible={isVisible}
              className="dark:bg-neutral-900"
            >
              <div
                style={{
                  maxWidth: 100,
                  width: "100%",
                }}
                className="my-8 mx-auto h-auto"
              >
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={value}
                  viewBox={`0 0 256 256`}
                />
              </div>

              <div className="w-full flex flex-row justify-center items-center gap-3 mt-5 mb-10 text-content-color pb-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`${recipe?.shareableLink}`);
                    toggleDropdown();
                  }}
                >
                  <IoClipboardOutline className="text-[1.2rem]" />
                </button>
                <button type="button">
                  <a
                    href={`https://t.me/share/url?url=${recipe?.shareableLink}&text=${recipe?.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LiaTelegram className="text-[1.4rem]" />
                  </a>
                </button>
                <button>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${recipe?.shareableLink}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LiaFacebookSquare className="text-[1.6rem]" />
                  </a>
                </button>
                <button>
                  <a
                    href={`https://api.whatsapp.com/send?text=${recipe?.shareableLink}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaWhatsapp className="text-[1.2rem]" />
                  </a>
                </button>
              </div>
              <Button
                variant="outline"
                className="absolute top-2 right-2 border-none shadow-none dark:bg-neutral-900"
                onClick={(e) => {
                  e.preventDefault();
                  closeDrawer();
                }}
              >
                <RiCloseLargeLine className="text-[1rem] text-content-color" />
              </Button>
            </Drawer>

            {recipesLoading ? (
              <ClipLoader color="#000" loading={recipesLoading} size={25} />
            ) : (
              <>
                {location.pathname.startsWith("/user") && recipe?.ownsRecipe ? (
                  <>
                    <li
                      className="hover:bg-gray-100 dark:hover:bg-neutral-700 dark:hover:bg-opacity-30 text-slate-500 p-1 px-3 cursor-pointer"
                      onClick={goToEdit}
                    >
                      Edit
                    </li>
                    <li
                      className="hover:bg-gray-100 dark:hover:bg-neutral-700 dark:hover:bg-opacity-30 p-1 px-3 cursor-pointer text-red-700"
                      onClick={openDialog}
                    >
                      Delete
                    </li>
                    {openDialogBox && (
                      <AlertDialogBox
                        title="Confirm Deletion"
                        detail="Are you sure you want to delete this recipe?"
                        cancelContent="Cancel"
                        buttonContent="Yes, delete recipe"
                        closeDialog={closeDialog}
                        handleAction={handleDeletion}
                        isLoading={isLoading}
                      />
                    )}
                  </>
                ) : (
                  <li className="hover:bg-gray-100 dark:hover:bg-neutral-700 dark:hover:bg-opacity-30 text-slate-500 p-1 px-3 cursor-pointer">
                    Report
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DetailNavDropdown;
