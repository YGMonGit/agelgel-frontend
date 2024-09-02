import ChipsBoxDynamic from "../../components/ChipsBoxDynamic";
import { Input } from "../../components/Input";
import React, { useState } from "react";
import { EChronicDisease } from "../../api/types/user.type";
import WideButton from "../../components/WideButton";
import PageHeader from "../../components/PageHeader";
import {
  INewIngredientFrom
} from "../../api/types/ingredient.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newIngredientSchema } from "../../validation/ingredient.validation";

function ModeratorAddIngredient() {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmharicName, setIngredientAmharicName] = useState("");
  const [type, setType] = useState("");
  const [unit, setUnit] = useState<string[]>([]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    // setError,
    // setValue,
  } = useForm<INewIngredientFrom>({
    resolver: zodResolver(newIngredientSchema),
    // defaultValues: {
    //   cookingTime: "0",
    //   medical_condition: user?.medical_condition,
    // },
  });

  const onIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIngredientName(e.target.value);
  const onIngredientAmharicChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIngredientAmharicName(e.target.value);
  const onTypeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setType(e.target.value);

  return (
    <form className="w-full flex flex-col flex-grow justify-start items-center pt-5">
      <div className="w-full pb-2">
        <PageHeader header="Add Ingredient" detail="Enter new ingredient here." />
      </div>
      <Input
        label="Ingredient Name (English)"
        placeholder="name"
        value={ingredientName}
        onChange={onIngredientChange}
        register={register}
        errors={errors.name}
      />
      <Input
        label="Ingredient Name (Amharic)"
        placeholder="localName"
        value={ingredientAmharicName}
        onChange={onIngredientAmharicChange}
        register={register}
        errors={errors.localName}
      />
      <Input
        label="Type"
        placeholder="type"
        value={type}
        onChange={onTypeChange}
        register={register}
        errors={errors.type}
      />

      <div className="w-full flex-grow">
        <ChipsBoxDynamic
          name="medical_condition.chronicDisease"
          label="Chronic Diseases"
          options={Object.values(EChronicDisease)}
          detail="Select all the condition(s) you have"
          selectedConditions={unit}
          setSelectedConditions={setUnit}
          register={register}
          errors={errors.unitOptions}
        />
      </div>

      <div className="w-full px-5 mb-4">
        <WideButton label="Add Ingredient" color="bg-content-color" />
      </div>

      {/* type, unit */}
    </form>
  );
}

export default ModeratorAddIngredient;
