import React from "react";
import SpaceOne from "../../assets/images/space-1.png";
import { FaAngleRight } from "react-icons/fa6";
import { Input } from "../../components/Input";
import { HeightIcon } from "@radix-ui/react-icons";
import WideButton from "../../components/WideButton";
import WideLink from "../../components/WideLink";
import { EGender } from "../../api/types/mealPreference.type";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface PersonalDataOneProps {
  setFromPage: React.Dispatch<React.SetStateAction<number>>;
  weight: number;
  setWeight: React.Dispatch<React.SetStateAction<number>>;
  height: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  age: number;
  setAge: React.Dispatch<React.SetStateAction<number>>;
  register: any;
  errors: any;
}

function PersonalDataOne({ setFromPage, weight, setWeight, height, setHeight, age, setAge, register, errors }: PersonalDataOneProps) {
  const onWeightChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWeight(Number.parseInt(e.target.value));
  const onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setHeight(Number.parseInt(e.target.value));
  const onAgeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAge(Number.parseInt(e.target.value));

  const nextPage = () => setFromPage(2);

  return (
    <div className="w-full flex flex-col flex-grow justify-start items-center">
      <img src={SpaceOne} alt="pic" className="w-full p-9 pt-12 max-w-[450px]" />
      <Input
        type="number"
        label="Weight"
        placeholder="weight"
        value={weight}
        onChange={onWeightChange}
        // register={register}
        // {...register("weight", { valueAsNumber: true })}
        {...register("weight", { valueAsNumber: true })}
        errors={errors.weight}
      />
      <Input
        type="number"
        label="Height"
        placeholder="height"
        value={height}
        onChange={onHeightChange}
        // register={register}
        {...register("height", { valueAsNumber: true })}
        errors={errors.height}
      />
      <Input
        type="number"
        label="Age"
        placeholder="age"
        value={age}
        onChange={onAgeChange}
        // register={register}
        {...register("age", { valueAsNumber: true })}
        errors={errors.age}
      />

      <div className="w-full flex-grow"></div>
      
      <div className="w-full px-5 mb-5">
        <WideLink label="Next" color="bg-content-color" clickAction={nextPage} />
      </div>
    </div>
  );
}

export default PersonalDataOne