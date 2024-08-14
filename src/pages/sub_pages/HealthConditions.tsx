import React from "react";
import PageHeader from "../../components/PageHeader";
import { Checkbox } from "../../components/ui/checkbox";
import ChipsBox from "../../components/ChipsBox";
import { allergies, mealPreferences } from "../../assets/data";
import WideButton from "../../components/WideButton";

interface HealthConditionProps {
  rememberDiabetes: boolean;
  setRememberDiabetes: React.Dispatch<React.SetStateAction<boolean>>;
  rememberLI: boolean;
  setRememberLI: React.Dispatch<React.SetStateAction<boolean>>;
  allergy: string[];
  setAllergy: React.Dispatch<React.SetStateAction<string[]>>;
  mealPreference: string[];
  setMealPreference: React.Dispatch<React.SetStateAction<string[]>>;
  handleSubmit: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>;
}

function HealthConditions({
  rememberDiabetes,
  setRememberDiabetes,
  rememberLI,
  setRememberLI,
  allergy,
  setAllergy,
  mealPreference,
  setMealPreference,
  handleSubmit,
}: HealthConditionProps) {
  const handleLIToggle = () => setRememberLI(!rememberLI);
  const handleDiabetesToggle = () => setRememberDiabetes(!rememberDiabetes);

  return (
    <div className="w-full flex flex-col flex-grow justify-start items-center pb-8">
      <PageHeader
        header="Health conditions & Preferences"
        detail="Helps with our suggestions."
      />
      <div className="w-full px-5 flex flex-col justify-start items-start select-none mb-2">
        <p className="select-none font-[500] text-[1.1rem] mt-3">
          Please enter your health condition(s)
        </p>
        <label
          htmlFor="terms"
          className="flex justify-start flex-wrap py-3 items-center gap-1 text-[1rem] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-700 font-[500]"
        >
          <Checkbox
            id="terms"
            className="border-0 bg-[#F9FAFB] mr-1"
            onClick={handleDiabetesToggle}
          />
          <span className="select-none">Diabetes</span>
          <p className="w-full pl-7 text-slate-500 text-[.9rem] font-normal leading-5">
            You could either be Type I or Type II, we've got you covered.
          </p>
        </label>
        <label
          htmlFor="LI"
          className="flex justify-start flex-wrap py-3 items-center gap-1 text-[1rem] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-700 font-[500]"
        >
          <Checkbox
            id="LI"
            className="border-0 bg-[#F9FAFB] mr-1"
            onClick={handleLIToggle}
          />
          <span className="select-none">Lactose Intolerance</span>
          <p className="w-full pl-7 text-slate-500 text-[.9rem] font-normal leading-5">
            Inability to digest lactose, which may result in abdominal pain,
            bloating and diarrhoea after consuming milk and other dairy
            products. Affects 65% of the human population.
          </p>
        </label>
      </div>
      <div className="w-full flex flex-col justify-start items-center flex-grow">
        <ChipsBox
          label="Allergies"
          options={allergies}
          detail="Food groups or ingredients you're allergic to."
          selectedConditions={allergy}
          setSelectedConditions={setAllergy}
        />
        <ChipsBox
          label="Please enter your meal preference(s)"
          options={mealPreferences}
          detail="This is here to make sure you end up loving the recipes we suggest."
          selectedConditions={mealPreference}
          setSelectedConditions={setMealPreference}
        />
      </div>
      <div className="w-full px-5">
        <WideButton
          label="Get Started"
          color="bg-content-color"
          clickEvent={handleSubmit}
        />
      </div>
    </div>
  );
}

export default HealthConditions;