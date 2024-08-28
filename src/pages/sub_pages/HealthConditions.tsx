import React from "react";
import PageHeader from "../../components/PageHeader";
import ChipsBox from "../../components/ChipsBox";
import WideButton from "../../components/WideButton";
import { EAllergies, EChronicDisease, EDietaryPreferences } from "../../api/types/user.type";
import WideLink from "../../components/WideLink";
import ClipLoader from "react-spinners/ClipLoader";

interface HealthConditionProps {
  setFormNumber: React.Dispatch<React.SetStateAction<number>>;
  healthCondition: string[];
  setHealthCondition: any;
  allergies: string[];
  setAllergies: any;
  mealPreference: string[];
  setMealPreference: any;
  finish?: boolean;
  register?: any;
  errors?: any;
  isLoading?: any;
}

function HealthConditions({
  setFormNumber,
  healthCondition,
  setHealthCondition,
  allergies,
  setAllergies,
  mealPreference,
  setMealPreference,
  finish = true,
  register,
  errors,
  isLoading,
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
          name="medical_condition.chronicDisease"
          label="Chronic Diseases"
          options={Object.values(EChronicDisease)}
          detail="Select all the condition(s) you have"
          selectedConditions={healthCondition}
          setSelectedConditions={setHealthCondition}
          register={register}
          errors={errors && errors.medical_condition && errors.medical_condition?.chronicDiseases}
        />

        <ChipsBox
          name="medical_condition.dietaryPreferences"
          label="Please enter your meal preference(s)"
          options={Object.values(EDietaryPreferences)}
          detail="This is here to make sure you end up loving the recipes we suggest."
          selectedConditions={mealPreference}
          setSelectedConditions={setMealPreference}
          register={register}
          errors={errors && errors.medical_condition && errors.medical_condition?.dietary_preferences}
        />

        <ChipsBox
          name="medical_condition.allergie"
          label="Allergies"
          options={Object.values(EAllergies)}
          detail="Food groups or ingredients you're allergies to."
          selectedConditions={allergies}
          setSelectedConditions={setAllergies}
          register={register}
          errors={errors && errors.medical_condition && errors.medical_condition?.allergies}
        />
      </div>
      {finish ? (
        <div className="w-full px-5 flex justify-center items-end gap-2">
          <WideLink
            label="Back"
            color="bg-white"
            outline={true}
            clickAction={onBackClick}
          />
          {isLoading ? (
            <WideButton label={
              <div className="flex justify-center items-center w-full h-full gap-2">
                <ClipLoader
                  color={"white"}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <p className="text-white text-[1.1rem] italic">loading ...</p>
              </div>
            } color="bg-content-color" disable={isLoading} />
          ) : (
            <WideButton
              label="Get Started"
              color="bg-content-color"
            />
          )}
        </div>
      ) : (
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