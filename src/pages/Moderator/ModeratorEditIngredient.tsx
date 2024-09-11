import ChipsBoxDynamic from "../../components/ChipsBoxDynamic";
import { Input } from "../../components/Input";
import React, { useEffect, useState } from "react";
import { EChronicDisease } from "../../api/types/user.type";
import WideButton from "../../components/WideButton";
import PageHeader from "../../components/PageHeader";
import { INewIngredientFrom } from "../../api/types/ingredient.type";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newIngredientSchema } from "../../validation/ingredient.validation";
import {
  useGetUniqueTypeQuery,
  useGetUniqueUnitQuery,
  useUpdateIngredientMutation,
  useGetIngredientByIdQuery,
} from "../../api/slices/ingredient.slices";
import ChipsBox from "../../components/ChipsBoxTwo";
import ClipLoader from "react-spinners/ClipLoader";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useParams } from "react-router-dom";

function ModeratorEditIngredient() {
  const iID = useParams();
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmharicName, setIngredientAmharicName] = useState("");
  const [type, setType] = useState("");
  const [unitOptions, setUnitOptions] = useState<string[]>([]);

  const { data: types, isLoading: typesLoading } = useGetUniqueTypeQuery();
  const { data: units, isLoading: unitsLoading } = useGetUniqueUnitQuery();
  const [updateIngredient, { isLoading }] = useUpdateIngredientMutation();

  const { data: ingredient } = useGetIngredientByIdQuery(String(iID.id));

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm<INewIngredientFrom>({
    resolver: zodResolver(newIngredientSchema),
  });

  useEffect(() => {
    if (ingredient) {
      setValue("localName", ingredient.localName);
      setIngredientAmharicName(ingredient.localName);
      setValue("name", ingredient.name);
      setIngredientName(ingredient.name);
      setValue("type", ingredient.type);
      setType(ingredient.type);
      setValue("unitOptions", ingredient.unitOptions);
      setUnitOptions(ingredient.unitOptions);
    }
  }, [ingredient]);

  console.log({ errors });
  console.log({ getValues: getValues() });

  const submit = async (data: INewIngredientFrom) => {
    try {
      await updateIngredient({
        ingredientsId: String(iID.id),
        updates: data,
      }).unwrap();
    } catch (error: any) {
      if (!error.data.error) return;
      const err = error.data.error;
      console.log({ err });
      if (err.type === "validation") setError(err.attr, { message: err.msg });
    }
  };

  const errorStyle = "text-[.8rem] text-red-400";

  useEffect(() => {
    setValue("unitOptions", unitOptions);
  }, [unitOptions]);

  useEffect(() => {
    setValue("type", type);
  }, [type]);

  const onIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIngredientName(e.target.value);
  const onIngredientAmharicChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIngredientAmharicName(e.target.value);
  const onTypeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setType(e.target.value);

  return (
    <form
      className="w-full flex flex-col flex-grow justify-start items-center"
      onSubmit={handleSubmit(submit)}
    >
      <div className="w-full pb-2">
        <PageHeader header="Edit Ingredient" detail="Update ingredient here." />
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

      <div className="w-full px-5 flex flex-col justify-center items-start gap-2">
        <p className="text-[1.1rem] font-semibold">Type</p>
        <FormControl
          fullWidth
          sx={{
            borderRadius: "0.75rem",
            marginBottom: "1.25rem",
            backgroundColor: "#F9FAFB",
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.75rem",
              "& fieldset": {
                borderColor: "#D1D5DB",
              },
              "&:hover fieldset": {
                borderColor: "#D1D5DB",
              },
              "&.Mui-focused fieldset": {
                border: "1px solid #D1D5DB",
              },
            },
          }}
        >
          <Select
            value={type}
            onChange={onTypeChange as any}
            displayEmpty
            sx={{
              "& .MuiSelect-select": {
                borderRadius: "0.75rem",
              },
            }}
          >
            {types?.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
          {errors && errors.type && (
            <p className={errorStyle}>{errors.type.message}</p>
          )}
        </FormControl>
      </div>

      <div className="w-full px-5">
        <ChipsBox
          loading={unitsLoading}
          control={control}
          name="unitOptions"
          label="Unit Options"
          options={units || []}
          detail="Select all the units that this ingredient can be measured in."
          selectedConditions={unitOptions}
          setSelectedConditions={setUnitOptions}
          register={register}
          errors={errors.unitOptions}
        />
      </div>

      <div className="w-full px-5 mb-4 mt-auto">
        {isLoading ? (
          <WideButton
            label={
              <div className="flex justify-center items-center w-full h-full gap-2">
                <ClipLoader
                  color={"white"}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <p className="text-white text-[1.1rem] italic">loading ...</p>
              </div>
            }
            color="bg-content-color"
            disable={true}
          />
        ) : (
          <WideButton label="Edit Ingredient" color="bg-content-color" />
        )}
      </div>
    </form>
  );
}

export default ModeratorEditIngredient;
