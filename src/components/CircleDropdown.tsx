import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mySpaceUrl } from "../assets/data";
import { useGetUserQuery, useLogOutMutation } from "../api/slices/user.slices";
import { loadingUrl } from "../assets/data";


function CircleDropdown() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: user } = useGetUserQuery();
  const [logOut] = useLogOutMutation();


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
        {
          user?.profile_img ? (
            <img src={user.profile_img} alt="profile" className="w-8 h-8 rounded-full" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-300 flex justify-center items-center text-white text-[1.6rem] font-semibold">
              {user?.first_name[0]} {user?.last_name[0]}
            </div>
          )
        }
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-10 right-0 bg-white shadow-lg border border-gray-300 rounded-lg py-2 w-[200px]"
        >
          <ul className="space-y-1">
            <li className="hover:bg-gray-100 p-1 px-3 cursor-pointer flex flex-col justify-center items-start border-b border-gray-400">
              <p className="text-[.9rem] font-semibold">{user?.first_name}</p>
              <p className="text-[.8rem] text-slate-500 -mt-1">{user?.email}</p>
            </li>
            <li className="hover:bg-gray-100 text-slate-500 rounded-md p-1 px-3 cursor-pointer" onClick={() => navigate(mySpaceUrl)}>
              Recipes
            </li>
            <li className="hover:bg-gray-100 text-slate-500 rounded-md p-1 px-3 cursor-pointer">
              Health condition
            </li>
            <li className="hover:bg-gray-100 rounded-md p-1 px-3 cursor-pointer text-red-700" onClick={async () => {
              await logOut().unwrap();
              navigate(loadingUrl);
            }}>
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default CircleDropdown;