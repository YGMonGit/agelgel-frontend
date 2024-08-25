import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mySpaceUrl } from "../assets/data";

function CircleDropdown() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="bg-gray-100 rounded-full w-9 h-9 flex justify-center items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="font-semibold">YG</span>
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-10 right-0 bg-white shadow-lg border border-gray-300 rounded-lg py-2 w-[200px]"
        >
          <ul className="space-y-1">
            <li className="hover:bg-gray-100 p-1 px-3 cursor-pointer flex flex-col justify-center items-start border-b border-gray-400">
              <p className="text-[.9rem] font-semibold">Full Name</p>
              <p className="text-[.8rem] text-slate-500 -mt-1">name@example.com</p>
            </li>
            <li className="hover:bg-gray-100 text-slate-500 rounded-md p-1 px-3 cursor-pointer" onClick={() => navigate(mySpaceUrl)}>
              Recipes
            </li>
            <li className="hover:bg-gray-100 text-slate-500 rounded-md p-1 px-3 cursor-pointer">
              Health condition
            </li>
            <li className="hover:bg-gray-100 rounded-md p-1 px-3 cursor-pointer text-red-700">
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default CircleDropdown;