import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import ChipsBox from "../components/ChipsBox";
import WideButton from "../components/WideButton";
import { EAllergies, EChronicDisease, EDietaryPreferences } from "../api/types/user.type";
import WideLink from "../components/WideLink";
import ClipLoader from "react-spinners/ClipLoader";
import { useSignUpMutation } from "../api/slices/user.slices";

function UpdateHealthCondition() {

  const [healthCondition, setHealthCondition] = useState<EChronicDisease[]>([]);
  const [allergies, setAllergies] = useState<EAllergies[]>([]);
  const [mealPreference, setMealPreference] = useState<EDietaryPreferences[]>([]);

  const [signUp, { isLoading }] = useSignUpMutation();

  return (
    <form className="w-full flex flex-col flex-grow justify-start items-center pb-8">
      <PageHeader
        header="Edit health conditions"
        detail="Update the information of your health condition"
      />
      <div className="w-full flex flex-col justify-start items-center flex-grow mt-2">
        <ChipsBox
          name="medical_condition.chronicDisease"
          label="Chronic Diseases"
          options={Object.values(EChronicDisease)}
          detail="Select all the condition(s) you have"
          selectedConditions={healthCondition}
          setSelectedConditions={setHealthCondition}
          // register={register}
          // errors={errors && errors.medical_condition && errors.medical_condition?.chronicDiseases}
        />

        <ChipsBox
          name="medical_condition.dietaryPreferences"
          label="Please enter your meal preference(s)"
          options={Object.values(EDietaryPreferences)}
          detail="This is here to make sure you end up loving the recipes we suggest."
          selectedConditions={mealPreference}
          setSelectedConditions={setMealPreference}
          // register={register}
          // errors={errors && errors.medical_condition && errors.medical_condition?.dietary_preferences}
        />

        <ChipsBox
          name="medical_condition.allergie"
          label="Allergies"
          options={Object.values(EAllergies)}
          detail="Food groups or ingredients you're allergies to."
          selectedConditions={allergies}
          setSelectedConditions={setAllergies}
          // register={register}
          // errors={errors && errors.medical_condition && errors.medical_condition?.allergies}
        />
      </div>
        <div className="w-full px-5">
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
              label="Update"
              color="bg-content-color"
            />
          )}
        </div>
    </form>
  );
}

export default UpdateHealthCondition;