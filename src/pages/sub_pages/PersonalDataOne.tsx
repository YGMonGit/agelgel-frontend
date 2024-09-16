import React from "react";
import SpaceOne from "../../assets/images/space-1.png";
import { FaAngleRight } from "react-icons/fa6";
import { Input } from "../../components/Input";
import { HeightIcon } from "@radix-ui/react-icons";
import WideButton from "../../components/WideButton";
import WideLink from "../../components/WideLink";
import { EGender } from "../../api/types/mealPreference.type";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

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
  control: any;
}

function PersonalDataOne({ setFromPage, weight, setWeight, height, setHeight, age, setAge, register, errors, control }: PersonalDataOneProps) {
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

      <Controller
        name="weight"
        control={control}
        defaultValue={weight}
        render={({ field }) => (
          <Input
            type="number"
            label="Weight"
            placeholder="weight"
            {...field}
            value={weight}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(Number.parseInt(value));
              onWeightChange(e);
            }}
            errors={errors.weight}
          />
        )}
      />

      <Controller
        name="height"
        control={control}
        defaultValue={height}
        render={({ field }) => (
          <Input
            type="number"
            label="Height"
            placeholder="height"
            {...field}
            value={height}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(Number.parseInt(value));
              onHeightChange(e);
            }}
            errors={errors.height}
          />
        )}
      />

      <Controller
        name="age"
        control={control}
        defaultValue={age}
        render={({ field }) => (
          <Input
            type="number"
            label="Age"
            placeholder="age"
            {...field}
            value={age}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(Number.parseInt(value));
              onAgeChange(e);
            }}
            errors={errors.age}
          />
        )}
      />

      <div className="w-full flex-grow"></div>

      <div className="w-full px-5 mb-5">
        <WideLink label="Next" color="bg-content-color" clickAction={nextPage} />
      </div>
    </div>
  );
}

export default PersonalDataOne