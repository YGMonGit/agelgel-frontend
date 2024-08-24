import React from "react";
import PageHeader from "../../components/PageHeader";
import ChipsBox from "../../components/ChipsBox";
import { allergies, mealPreferences } from "../../assets/data";
import WideButton from "../../components/WideButton";
import { EAllergies, EChronicDisease, EDietaryPreferences } from "../../api/types/user.type";
import WideLink from "../../components/WideLink";

interface HealthConditionProps {
  setFormNumber: React.Dispatch<React.SetStateAction<number>>;
  healthCondition: string[];
  setHealthCondition: any;
  allergy: string[];
  setAllergy: any;
  mealPreference: string[];
  setMealPreference: any;
  finish?: boolean;
}

function HealthConditions({
  setFormNumber,
  healthCondition,
  setHealthCondition,
  allergy,
  setAllergy,
  mealPreference,
  setMealPreference,
  finish=true
}: HealthConditionProps) {

  const onBackClick = () => { setFormNumber(1) };
  const onNextClick = () => { setFormNumber(3) };

  return (
    <div className="w-full flex flex-col flex-grow justify-start items-center pb-8">
      <PageHeader
        header="Chronic Diseases,Allergies & Preferences"
        detail="Helps with our suggestions."
      />
      <div className="w-full flex flex-col justify-start items-center flex-grow">
        <ChipsBox
          label="Chronic Diseases"
          options={Object.values(EChronicDisease)}
          detail="Select all the condition(s) you have"
          selectedConditions={healthCondition}
          setSelectedConditions={setHealthCondition}
        />
        <ChipsBox
          label="Allergies"
          options={Object.values(EAllergies)}
          detail="Food groups or ingredients you're allergic to."
          selectedConditions={allergy}
          setSelectedConditions={setAllergy}
        />
        <ChipsBox
          label="Please enter your meal preference(s)"
          options={Object.values(EDietaryPreferences)}
          detail="This is here to make sure you end up loving the recipes we suggest."
          selectedConditions={mealPreference}
          setSelectedConditions={setMealPreference}
        />
      </div>
        {finish ? (
      <div className="w-full px-5">
          <WideButton
            label="Get Started"
            color="bg-content-color"
          />
          </div>
        ):(
          <div className="w-full px-5 flex justify-center items-end gap-2">
        <WideLink label="Back" color="bg-white" outline={true} clickAction={onBackClick} />
        <WideLink label="Next" color="bg-content-color" clickAction={onNextClick} />
      </div>
        )}
        {/* <button>submit</button> */}
    </div>
  );
}

export default HealthConditions;