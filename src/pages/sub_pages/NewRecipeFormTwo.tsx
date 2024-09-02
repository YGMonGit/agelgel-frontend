import { Input } from "../../components/Input";
import ChipsList from "../../components/ChipsList";
import React, { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import WideLink from "../../components/WideLink";
import { useGetIngredientByNameQuery, useGetIngredientsQuery } from "../../api/slices/ingredient.slices";

import DropdownInput from "../../components/DropdownInput";
import { IIngredient } from "@/src/api/types/ingredient.type";
import { INewIngredientFrom, IngredientDetailWithUnit } from "@/src/api/types/recipe.type";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface NewRecipeFormTwoProps {
  setFormNumber: React.Dispatch<React.SetStateAction<number>>;
  ingredients: INewIngredientFrom[];
  ingredientList: IngredientDetailWithUnit[];
  setIngredientList: React.Dispatch<React.SetStateAction<IngredientDetailWithUnit[]>>;
  setIngredients: React.Dispatch<React.SetStateAction<INewIngredientFrom[]>>;
  register: any;
  errors: any;
  setError: any;
}

function NewRecipeFormTwo({ setFormNumber, ingredientList, setIngredientList, setIngredients, register, errors, setError }: NewRecipeFormTwoProps) {

  // ingredient search key
  const [ingredientSearch, setIngredientSearch] = useState("");

  // RTK Query
  const { data: ingredients, isFetching, isUninitialized, refetch } = useGetIngredientByNameQuery({
    name: ingredientSearch,
    nameType: "name",
  }, {
    skip: ingredientSearch.length == 0,
  });
  const { data: ingredientsQuery } = useGetIngredientsQuery({ skip: 0, limit: 10 });

  // selected unit
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  // selected ingredient
  const [ingredient, setIngredient] = useState<IIngredient | null>(null);
  console.log({ ingredient });

  // selected ingredient quantity
  const [ingredientQuantity, setIngredientQuantity] = useState(0);

  // to be displayed ingredient list [string]
  const [_IngredientList, set_IngredientList] = useState<string[]>([]);

  // on user typing ingredient name
  const onIngredientChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientSearch(e.target.value);
    if (!isFetching && !isUninitialized) refetch();
  };
  // on user typing ingredient quantity
  const onIngredientQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => setIngredientQuantity(Number(e.target.value));

  // on user add ingredient with unit and quantity
  const handleAddIngredient = () => {

    if (ingredient && ingredientQuantity > 0 && selectedUnit) {
      setIngredientList((prev: IngredientDetailWithUnit[]) => {
        const _IngredientDetail = { ingredient: ingredient._id, name: ingredient.name, amount: ingredientQuantity, unit: selectedUnit };
        return prev.includes(_IngredientDetail) ? prev : [...prev, _IngredientDetail];
      });
      setIngredients((prev: INewIngredientFrom[]) => {
        const _IngredientDetail: INewIngredientFrom = { ingredient: ingredient._id, unit: selectedUnit, amount: ingredientQuantity };
        return prev.includes(_IngredientDetail) ? prev : [...prev, _IngredientDetail];
      });
      const newIngredient = `${ingredient.name}, ${ingredientQuantity} ${selectedUnit}`;
      set_IngredientList([..._IngredientList, newIngredient]);
      setIngredient(null);
      setIngredientQuantity(0);
      setIngredientSearch("");
    } else {
      if (!ingredient) setError("Please select ingredient");
      if (ingredientQuantity <= 0) setError("Please enter ingredient quantity");
      if (!selectedUnit) setError("Please select unit");
      else setError("please fill all fields");
    }
  };



  const onBackClick = () => { setFormNumber(1) };
  const onNextClick = () => { setFormNumber(4) };


  return (
    <div className="w-full flex-grow flex flex-col justify-start items-start mt-2">
      <ChipsList
        label="Added Ingredients"
        detail="Make sure to not forget anything!"
        selectedConditions={ingredientList}
        setSelectedConditions={setIngredientList}

      />
      <DropdownInput
        boxLabel="Select Ingredient"
        data={ingredientSearch.length == 0 ? ingredientsQuery || [] : ingredients || []}
        usedFor="ingredients.ingredient"
        ingredientSearch={ingredientSearch}
        setIngredientSearch={setIngredientSearch}
        value={ingredient as any}
        onChange={onIngredientChange}
        onClick={(option: IIngredient) => {
          setIngredient(option);
        }}
        wFull
        mustFill
        register={register}
        errors={errors && errors.ingredients}
      />
      <div className="w-full px-5 flex flex-col justify-start items-start flex-grow">
        <label htmlFor="ingredientQuantity" className="text-[1rem] font-semibold">
          Ingredient Quantity
        </label>
        <div className="flex justify-start items-start outline-none my-2 gap-2">
          <div className="flex justify-start items-start border rounded-lg outline-none border-gray-300">
            <button
              className="h-[37px] w-[40px] bg-gray-200 rounded-l-lg flex justify-center items-center"
              onClick={() => setIngredientQuantity(Math.max(ingredientQuantity - 1, 0))}
            >
              <MdRemove />
            </button>


            <input
              type="text"
              placeholder="_"
              id="ingredientQuantity"
              name="ingredients.amount"
              value={ingredientQuantity}
              onChange={onIngredientQuantityChange}
              autoComplete="off"
              required
              className="w-[65px] text-center h-[37px] bg-[#F9FAFB] text-[1rem] border-x outline-none border-gray-300"
            />
            {errors && errors.ingredients && <p className="text-[.8rem] text-red-400">{errors.ingredients.amount?.message}</p>}
            <button
              type="button"
              className="h-[37px] w-[40px] bg-gray-200 rounded-r-lg flex justify-center items-center"
              onClick={() => setIngredientQuantity(ingredientQuantity + 1)}
            >
              <MdAdd />
            </button>

            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">Unit</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={selectedUnit ?? ''}
                placeholder="select ingredient"
                name="ingredients.unit"
                onChange={(e) => { console.log({ val: e.target.value }); setSelectedUnit(e.target.value as string) }}
                label="Unit"
                fullWidth
                style={{ minWidth: "100px" }}
              >
                {

                  ingredient?.unitOptions.map((unit, index) => (
                    <MenuItem key={index} value={unit}>{unit}</MenuItem>
                  ))

                }
              </Select>
              {errors && errors.ingredients && <p className="text-[.8rem] text-red-400">{errors.ingredients.unit?.message}</p>}

            </FormControl>

          </div>
          <button
            type="button"
            className="h-[37px] px-3 rounded-md flex justify-center items-center border border-content-color bg-content-color text-white text-[.85rem] leading-none"
            onClick={handleAddIngredient}
          >
            <MdAdd className="text-[1.5rem]" /> ADD
          </button>
        </div>
        <p className="text-[.9rem] text-slate-400">
          In grams or milliliters.
        </p>
      </div>
      <div className="w-full px-5 flex justify-center items-end gap-2">
        <WideLink label="Back" color="bg-white" outline={true} clickAction={onBackClick} />
        <WideLink label="Next" color="bg-content-color" clickAction={onNextClick} />
      </div>
    </div>
  );
}

export default NewRecipeFormTwo;