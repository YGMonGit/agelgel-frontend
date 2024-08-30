import { Input } from "../../components/Input";
import ChipsList from "../../components/ChipsList";
import React, { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import WideLink from "../../components/WideLink";
import { useGetIngredientByNameQuery, useGetIngredientsQuery } from "../../api/slices/ingredient.slices";

import DropdownInput from "../../components/DropdownInput";
import { IIngredient } from "@/src/api/types/ingredient.type";
import { IngredientDetail, IngredientDetailWithUnit } from "@/src/api/types/recipe.type";

interface NewRecipeFormTwoProps {
  setFormNumber: React.Dispatch<React.SetStateAction<number>>;
  ingredients: IngredientDetail[];
  ingredientList: IngredientDetailWithUnit[];
  setIngredientList: React.Dispatch<React.SetStateAction<IngredientDetailWithUnit[]>>;
  setIngredients: React.Dispatch<React.SetStateAction<IngredientDetail[]>>;
  register: any;
  errors: any;
}

function NewRecipeFormTwo({ setFormNumber, ingredientList, setIngredientList, setIngredients, register, errors }: NewRecipeFormTwoProps) {

  const [ingredientSearch, setIngredientSearch] = useState("");
  const { data: ingredients, isFetching, isUninitialized, refetch } = useGetIngredientByNameQuery({
    name: ingredientSearch,
    nameType: "name",
  }, {
    skip: ingredientSearch.length == 0,
  });

  const { data: ingredientsQuery } = useGetIngredientsQuery({ skip: 0, limit: 10 });

  const [ingredient, setIngredient] = useState<IIngredient | null>(null);
  const [ingredientQuantity, setIngredientQuantity] = useState(0);

  const [_IngredientList, set_IngredientList] = useState<string[]>([]);

  const onIngredientChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientSearch(e.target.value);
    if (!isFetching && !isUninitialized) refetch();
  };
  const onIngredientQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => setIngredientQuantity(Number(e.target.value));

  const handleAddIngredient = () => {
    if (ingredient && ingredientQuantity > 0) {
      setIngredientList((prev: IngredientDetailWithUnit[]) => {
        const _IngredientDetail = { ingredient: ingredient._id, name: ingredient.name, amount: ingredientQuantity, unit: ingredient.unit };
        return prev.includes(_IngredientDetail) ? prev : [...prev, _IngredientDetail];
      });
      setIngredients((prev: IngredientDetail[]) => {
        const _IngredientDetail = { ingredient: ingredient._id, name: ingredient.name, amount: ingredientQuantity };
        return prev.includes(_IngredientDetail) ? prev : [...prev, _IngredientDetail];
      });
      const newIngredient = `${ingredient.name}, ${ingredientQuantity} ${ingredient.unit}`;
      set_IngredientList([..._IngredientList, newIngredient]);
      setIngredient(null);
      setIngredientQuantity(0);
      setIngredientSearch("");
    }
  };

  const onBackClick = () => { setFormNumber(1) };
  const onNextClick = () => { setFormNumber(4) };

  console.log(ingredientsQuery);
  

  return (
    <div className="w-full flex-grow flex flex-col justify-start items-start mt-2">
      <ChipsList
        label="Added Ingredients"
        detail="Make sure to not forget anything!"
        selectedConditions={ingredientList}
        setSelectedConditions={setIngredientList}
        errors={errors && errors.ingredients}
      />
      <DropdownInput
        boxLabel="Select Ingredient"
        data={ingredientSearch.length == 0 ? ingredientsQuery || [] : ingredients || []}
        usedFor="ingredient"
        ingredientSearch={ingredientSearch}
        setIngredientSearch={setIngredientSearch}
        value={ingredient as any}
        onChange={onIngredientChange}
        onClick={(option: IIngredient) => {
          setIngredient(option);
        }}
        wFull
        register={register}
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
              name="ingredientQuantity"
              value={ingredientQuantity}
              onChange={onIngredientQuantityChange}
              autoComplete="off"
              required
              className="w-[65px] text-center h-[37px] bg-[#F9FAFB] text-[1rem] border-x outline-none border-gray-300"
            />

            <p className="px-2 ml-5 mi-5 flex items-center text-[1rem] font-medium">{ingredient?.unit}</p>

            <button
              className="h-[37px] w-[40px] bg-gray-200 rounded-r-lg flex justify-center items-center"
              onClick={() => setIngredientQuantity(ingredientQuantity + 1)}
            >
              <MdAdd />
            </button>
          </div>
          <button
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