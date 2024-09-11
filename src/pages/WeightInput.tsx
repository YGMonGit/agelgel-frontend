import React from "react";
import SpaceOne from "../assets/images/space-1.png";
import { FaAngleRight } from "react-icons/fa6";
import { Input } from "../components/Input";
import { HeightIcon } from "@radix-ui/react-icons";
import WideButton from "../components/WideButton";
import WideLink from "../components/WideLink";

interface WeightInputProps {
  weight: number;
  setWeight: React.Dispatch<React.SetStateAction<number>>;
  height: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
}

function WeightInput({weight, setWeight, height, setHeight}: WeightInputProps) {
  const onWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWeight(value ? Number(value) : 0); // Convert to number, default to 0 if empty
  };
  const onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHeight(value ? Number(value) : 0); // Convert to number, default to 0 if empty
  };
  return (
    <div className="w-full flex flex-col flex-grow justify-start items-center">
      <img src={SpaceOne} alt="pic" className="w-full p-9 pt-12" />
      {/* <p className="text-[2rem] font-bold mt-2 mb-5">Weight</p> */}
      {/* <input 
        className="rounded-full border border-content-color w-[70%] py-3 px-4"
        type="number"
        placeholder="weight"
        value={weight}
        onChange={onWeightChange}
      /> */}
      <Input
        type="number"
        label="Weight"
        placeholder="weight"
        value={weight}
        onChange={onWeightChange}
        // register={register}
        // errors={errors.name}
      />
      <Input
        type="number"
        label="Height"
        placeholder="height"
        value={height}
        onChange={onHeightChange}
        // register={register}
        // errors={errors.name}
      />
      <div className="w-full px-5">
        <WideLink label="Finish" color="bg-content-color"/>
      </div>
      {/* <div className="w-full flex flex-grow pt-12 justify-center">
        <div className="h-16 aspect-square flex justify-center items-center bg-content-color rounded-full">
          <FaAngleRight className="text-[2rem] text-white"/>
        </div>
      </div> */}
    </div>
  );
}

export default WeightInput;
