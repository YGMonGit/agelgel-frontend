import { Input } from "../../components/Input";
import ChipsList from "../../components/ChipsList";
import React, { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import WideButton from "../../components/WideButton";

interface NewRecipeFormTwoProps {
  setFormNumber: React.Dispatch<React.SetStateAction<number>>;
  ingredientList: string[];
  setIngredientList: React.Dispatch<React.SetStateAction<string[]>>;
}

function NewRecipeFormTwo({ setFormNumber, ingredientList, setIngredientList }: NewRecipeFormTwoProps) {
  const [ingredient, setIngredient] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState(0);

  const onIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => setIngredient(e.target.value);
  const onIngredientQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => setIngredientQuantity(Number(e.target.value));

  const handleAddIngredient = () => {
    if (ingredient && ingredientQuantity > 0) {
      const newIngredient = `${ingredient}, ${ingredientQuantity}`;
      setIngredientList([...ingredientList, newIngredient]);
      setIngredient("");
      setIngredientQuantity(0);
    }
  };

  const onBackClick = () => {setFormNumber(1)};
  const onNextClick = () => {setFormNumber(3)};

  return (
    <div className="w-full flex-grow flex flex-col justify-start items-start mt-2">
      <ChipsList
        label="Added Ingredients"
        detail="Make sure to not forget anything!"
        selectedConditions={ingredientList}
        setSelectedConditions={setIngredientList}
      />
      <Input
        label="Ingredient"
        placeholder="Add here ..."
        value={ingredient}
        onChange={onIngredientChange}
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
        <WideButton label="Back" color="bg-white" outline={true} clickAction={onBackClick}/>
        <WideButton label="Next" color="bg-content-color" clickAction={onNextClick} />
      </div>
    </div>
  );
}

export default NewRecipeFormTwo;