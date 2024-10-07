import React from "react";
import Ygm from "../assets/images/YGM.jpg";
import Edel from "../assets/images/edel.jpg";
import Kolo from "../assets/images/kolo.jpg";
import Avatar from "../assets/images/avater.png";

const members = [
  {
    id: 1,
    name: "Yisehak Getachew",
    job: "Frontend developer",
    image: Ygm,
  },
  {
    id: 2,
    name: "Kaleab Teweldbrhan",
    job: "Backend developer",
    image: Kolo,
  },
  { id: 3, name: "Edelawit Abebe", job: "Software tester", image: Edel },
  { id: 4, name: "Lidiya Zeleke", job: "UI/UX designer", image: Avatar },
];

function Page404() {
  return (
    <div className="w-full flex-grow flex-wrap flex flex-col justify-center items-center relative mb-5">
      <p className="text-[2.1rem] font-semibold py-4 font-serif italic text-slate-500">Who would you like to fire?</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full px-5 mb-5">
        {members.map((member, index) => (
          <div key={index} className="relative flex flex-col justify-start items-start min-w-[150px] w-[42vw] sm:w-[30vw] max-w-[175px] select-none p-2 border dark:border-neutral-700 rounded-lg">
            <img src={member.image} className="w-full aspect-square"/>
            <p className="leading-4 mt-2 font-semibold">{member.name}</p>
            <p className="leading-4 text-slate-400 italic text-[.9rem]">{member.job}</p>
            <div className="w-full bg-content-color text-white flex justify-center items-center font-semibold py-1 my-2 rounded-lg cursor-pointer">Select</div>
            <p className="text-[.8rem] ">Vote: 3</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page404;
