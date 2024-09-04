import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import QRCode from 'react-qr-code';

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

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";

import telegramLogo from "../assets/icons/tg-logo.png";
import facebookLogo from "../assets/icons/facebook.png";
import whatsappLogo from "../assets/icons/whatsapp.png";
import shareLogo from "../assets/icons/share.png";
import { useGetPrivateRecipeByIdQuery } from "../api/slices/recipe.slices";
import { useLocation, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { ClipboardIcon } from "@radix-ui/react-icons";

function DetailNavDropdown() {
  const rID = useParams();
  const { data: recipe, isLoading: recipesLoading } = useGetPrivateRecipeByIdQuery(String(rID["id"]));
  const location = useLocation();


  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState<string>('https://example.com');

  useEffect(() => {
    if (recipe) {
      setValue(recipe.shareableLink);
    }
  }, [recipe])
  const [back, setBack] = useState('#FFFFFF');
  const [fore, setFore] = useState('#000000');
  const [size, setSize] = useState(256);

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
    const recipeId = '123'; // Replace this with your actual recipeId
    const recipeUrl = `https://yourwebsite.com/recipe/${recipeId}`;
    setValue(recipeUrl);
    console.log("Share");
    toggleDropdown();
  };

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
          className="absolute top-10 right-0 bg-white shadow-lg border border-gray-300 rounded-lg py-2 w-[110px]"
        >
          <ul className="space-y-1">
            <Drawer>
              <DrawerTrigger className="w-full">
                <li className="hover:bg-gray-100 text-slate-500 w-full text-start p-1 px-3 cursor-pointer">
                  Share
                </li>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle className="text-[1.5rem] leading-5 font-bold">
                    Share
                  </DrawerTitle>
                  <DrawerDescription className="italic text-slate-400">
                    Share recipe using
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <div style={{ height: "auto", margin: "0 auto", maxWidth: 100, width: "100%" }}>
                    <QRCode
                      size={256}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      value={value}
                      viewBox={`0 0 256 256`}
                    />
                  </div>

                  <div className=" w-full flex flex-row justify-center items-center gap-3 mb-3 pb-2 border-b">
                    <button type="button">
                      <ClipboardIcon className="w-[30px] text-[#0077B5]" onClick={
                        () => {
                          navigator.clipboard.writeText(
                            `${recipe?.shareableLink}`
                          );
                        }
                      } />
                    </button>
                    <button type="button">
                      <a href={`https://t.me/share/url?url=${recipe?.shareableLink}&text=${recipe?.name}`} target="_blank" rel="noreferrer">
                        <img src={telegramLogo} alt="pic" className="w-[30px]" />
                      </a>
                    </button>
                    <button>
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${recipe?.shareableLink}`} target="_blank" rel="noreferrer">
                        <img src={facebookLogo} alt="pic" className="w-[30px]" />
                      </a>
                    </button>
                    <button>
                      <a href={`https://api.whatsapp.com/send?text=${recipe?.shareableLink}`} target="_blank" rel="noreferrer">
                        <img src={whatsappLogo} alt="pic" className="w-[30px]" />
                      </a>
                    </button>
                    {/* <button>
                      <img src={shareLogo} alt="pic" className="w-[50px]" />
                    </button> */}
                  </div>
                  <DrawerClose>
                    <Button variant="outline" className="w-[60%]">
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

            {
              recipesLoading ? (
                <ClipLoader color="#000" loading={recipesLoading} size={25} />
              ) : (
                <>
                  {
                    location.pathname.startsWith("/user") && recipe?.ownsRecipe ? (
                      <li className="hover:bg-gray-100 text-slate-500 p-1 px-3 cursor-pointer">
                        Edit
                      </li>
                    ) : (
                      <li className="hover:bg-gray-100 text-slate-500 p-1 px-3 cursor-pointer">
                        Report
                      </li>
                    )
                  }


                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      {
                        location.pathname.startsWith("/user") && recipe?.ownsRecipe ? (
                          <li className="hover:bg-gray-100 p-1 px-3 cursor-pointer text-red-700">
                            Delete
                          </li>
                        ) : null
                      }
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white w-[90%] rounded-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-[1.6rem]">
                          Confirm Deletion
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[1.2rem] text-slate-400">
                          Are you sure you want to delete this recipe?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-[1.2rem] h-[56px] rounded-xl">
                          No, I've changed my mind
                        </AlertDialogCancel>
                        <AlertDialogAction className="text-[1.2rem] h-[56px] bg-red-700 rounded-xl">
                          Yes, delete it
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )
            }

          </ul>
        </div>
      )}
    </div>
  );
}

export default DetailNavDropdown;