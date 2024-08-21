import React from "react";
import PageHeader from "../../components/PageHeader";
import ChipsBox from "../../components/ChipsBox";
import { allergies, healthIssue, mealPreferences } from "../../assets/data";
import WideButton from "../../components/WideButton";

interface HealthConditionProps {
  healthCondition: string[];
  setHealthCondition: React.Dispatch<React.SetStateAction<string[]>>;
  allergy: string[];
  setAllergy: React.Dispatch<React.SetStateAction<string[]>>;
  mealPreference: string[];
  setMealPreference: React.Dispatch<React.SetStateAction<string[]>>;
  handleSubmit: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>;
}

function HealthConditions({
  healthCondition,
  setHealthCondition,
  allergy,
  setAllergy,
  mealPreference,
  setMealPreference,
  handleSubmit,
}: HealthConditionProps) {

  return (
    <div className="w-full flex flex-col flex-grow justify-start items-center pb-8">
      <PageHeader
        header="Health conditions & Preferences"
        detail="Helps with our suggestions."
      />
      <div className="w-full flex flex-col justify-start items-center flex-grow">
        <ChipsBox
          label="Your health condition(s)"
          options={healthIssue}
          detail="Select all the condition(s) you have"
          selectedConditions={healthCondition}
          setSelectedConditions={setHealthCondition}
        />
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