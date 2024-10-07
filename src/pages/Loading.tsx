import React, { useState, useRef } from 'react';
import { Slide, Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css"; // Important: Add this import
import MealPlannerImage from "../assets/images/meal-planner.png"
import Recommendation from "../assets/images/recommendation.png"
import Search from "../assets/images/search.png"
import Post from "../assets/images/post.png"
import Logo from "../assets/images/agelgel-logo.png";
import { loginUrl, moderatorLoginUrl, moderatorSignUpUrl, signUpUrl } from '../assets/data';
import { useLocation, useNavigate } from 'react-router-dom';
const Loading = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const slideRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideImages = [
    {image: Logo, text: "Meal Planner"},
    {image: MealPlannerImage, text: "Meal Planner"},
    {image: Recommendation, text: "Personalized Recommendation"},
    {image: Search, text: "Dynamic Search"},
    {image: Post, text: "Recipe Post"},
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-5 w-screen h-screen pb-10">
      <div className="w-full max-w-[800px]">
        <Slide
          ref={slideRef}
          duration={5000}
          transitionDuration={200}
          arrows={false}
          autoplay={true}
          pauseOnHover={true}
          indicators={(index) => (
            <div
              className={`w-[15px] h-[15px] rounded-full ${
                index === currentSlide ? "bg-green-500" : "bg-gray-300 dark:bg-neutral-700"
              } inline-block mx-1 cursor-pointer`}
            ></div>
          )}
          onChange={(oldIndex, newIndex) => setCurrentSlide(newIndex)}
        >
          {slideImages.map((slideImage, index) => (
            <div className='px-5 w-full'>
              <div key={index} className="flex flex-col justify-center items-center h-[240px] bg-gray-700 bg-opacity-60 py-1 gap-2 rounded-lg relative">
                <img 
                  src={slideImage.image} 
                  alt={`slide-${index}`}
                  className={`w-auto h-[90%] object-cover ${index === 0 && "p-5"}`}
                />
                <p className='mb-2 font-semibold italic text-opacity-70'>{slideImage.text}</p>
              </div>
            </div>
          ))}
        </Slide>
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-2 px-5">
        <p className="w-full text-[1rem] text-slate-500 text-center">
          It seems you're not logged in
        </p>
        <button className="w-full max-w-[800px] bg-green-600 font-semibold text-white px-4 py-2 rounded-md" onClick={() => {
          if (location.pathname.startsWith("/user")) {
            navigate(signUpUrl);
          } else if (location.pathname.startsWith("/moderator")) {
            navigate(moderatorSignUpUrl);
          }
        }}>
          Sign Up
        </button>
        <button className="w-full max-w-[800px] bg-white dark:bg-neutral-900 border border-green-600 font-semibold text-green-600 px-4 py-2 rounded-md" onClick={() => {
          if (location.pathname.startsWith("/user")) {
            navigate(loginUrl);
          } else if (location.pathname.startsWith("/moderator")) {
            navigate(moderatorLoginUrl);
          }
        }}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default Loading;