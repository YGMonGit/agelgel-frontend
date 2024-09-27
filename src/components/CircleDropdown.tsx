import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { editUserInfoUrl, homeUrl, moderatorEditInfoUrl, moderatorHomeUrl, moderatorSpaceUrl, moderatorWelcomeUrl, mySpaceUrl, notificationsUrl, searchUrl, updateHealthConditionUrl } from "../assets/data";
import { useGetUserQuery, useLogOutMutation } from "../api/slices/user.slices";
import { useGetModeratorQuery, useModeratorIogOutMutation } from "../api/slices/moderator.slices";
import { welcomeUrl } from "../assets/data";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

interface CircularDropdownProps {
  toggleDarkMode?: () => void;
  dark?: boolean;
}

function CircleDropdown({toggleDarkMode, dark}: CircularDropdownProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<any>(null);
  const { data: _user } = useGetUserQuery({} as any, { skip: !location.pathname.startsWith("/user") });
  const { data: moderator } = useGetModeratorQuery({} as any, { skip: !location.pathname.startsWith("/moderator") });

  useEffect(() => {
    if (location.pathname.startsWith("/user")) {
      setUser(_user);
    } else if (location.pathname.startsWith("/moderator")) {
      setUser(moderator);
    }
  }, [location, moderator, _user]);




  const [logOut] = useLogOutMutation();
  const [ModeratorLogOut] = useModeratorIogOutMutation();


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
        className="bg-gray-100 rounded-full flex justify-center items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        {
          user?.profile_img ? (
            <img src={user.profile_img} alt="profile" style={{
              objectFit: "cover",
              objectPosition: "center",
              height: "40px",
              width: "40px",
            }} className="w-8 h-8 rounded-full border border-[#15803d]" />
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
          className="absolute top-10 right-0 bg-white dark:bg-neutral-800 shadow-lg border border-gray-300 dark:border-neutral-700 rounded-lg py-2 w-[200px] z-50"
        >
          <ul className="space-y-1">
            <li className="hover:bg-gray-100 dark:hover:bg-neutral-700 dark:hover:bg-opacity-30 p-1 px-3 cursor-pointer flex flex-col justify-center items-start border-b border-gray-400" onClick={() => navigate(location.pathname.startsWith("/moderator") ? moderatorEditInfoUrl : editUserInfoUrl)}>
              <p className="text-[.9rem] font-semibold">{user?.first_name}</p>
              <p className="text-[.8rem] text-slate-500 -mt-1">{user?.email}</p>
            </li>
            <li className="hover:bg-gray-100 dark:hover:bg-neutral-700 dark:hover:bg-opacity-30 text-slate-500 p-1 px-3 cursor-pointer" onClick={() => navigate(location.pathname.startsWith("/moderator") ? moderatorSpaceUrl : mySpaceUrl)}>
              Recipes
            </li>
            {(location.pathname === homeUrl || location.pathname === searchUrl) && (
              <>
                <li className="hover:bg-gray-100 dark:hover:bg-neutral-700 dark:hover:bg-opacity-30 text-slate-500 p-1 px-3 cursor-pointer flex justify-start items-center gap-2" onClick={() => navigate(notificationsUrl)}>
                  <p>Notification</p>
                  <div className="w-[14px] h-[14px] bg-content-color text-white text-[.6rem] rounded-full flex justify-center items-center">3</div>
                </li>
                <li className="hover:bg-gray-100 dark:hover:bg-neutral-700 dark:hover:bg-opacity-30 text-slate-500 p-1 px-3 cursor-pointer" onClick={() => navigate(updateHealthConditionUrl)}>
                  Health condition
                </li>
              </>
            )}
            <li className="hover:bg-gray-100 dark:hover:bg-neutral-700 dark:hover:bg-opacity-30 p-1 px-3 cursor-pointer text-red-700" onClick={async () => {
              if (location.pathname.startsWith("/user")) {
                await logOut().unwrap();
                navigate(welcomeUrl);
              }
              else if (location.pathname.startsWith("/moderator")) {
                await ModeratorLogOut().unwrap();
                navigate(moderatorWelcomeUrl);
              }

            }}>
              Logout
            </li>
          </ul>
          <div className="w-6 flex justify-center items-center aspect-square rounded-full bg-neutral-200 dark:bg-neutral-700 absolute top-4 right-2 cursor-pointer" onClick={toggleDarkMode}>
            {dark ? (
              <MdOutlineLightMode className="text-content-color" />
            ) : (
              <MdDarkMode className="text-content-color" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CircleDropdown;