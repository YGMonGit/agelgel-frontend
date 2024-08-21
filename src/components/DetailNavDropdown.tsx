import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";

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

function DetailNavDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
            <li className="hover:bg-gray-100 text-slate-500 rounded-md p-1 px-3 cursor-pointer">
              Edit
            </li>
            <li
              className="hover:bg-gray-100 text-slate-500 rounded-md p-1 px-3 cursor-pointer"
              onClick={handleShare}
            >
              Share
            </li>
            <AlertDialog>
          <AlertDialogTrigger asChild>
            <li className="hover:bg-gray-100 rounded-md p-1 px-3 cursor-pointer text-red-700">
              Delete
            </li>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white w-[90%] rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[1.6rem]">Confirm Deletion</AlertDialogTitle>
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
          </ul>
        </div>
      )}
    </div>
  );
}

export default DetailNavDropdown;
