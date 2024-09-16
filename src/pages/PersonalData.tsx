import React, { useState } from 'react';
import PersonalDataOne from './sub_pages/PersonalDataOne';
import PersonalDataTwo from './sub_pages/PersonalDataTwo';
import { EGender, IUserStats } from '../api/types/mealPreference.type';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddMealPreferenceSchema } from '../validation/mealPreference.validation';

function PersonalData() {
  const [formPage, setFormPage] = useState(1);
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("");
  const [dietGoals, setDietGoals] = useState<string>("");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm<IUserStats>({
    resolver: zodResolver(AddMealPreferenceSchema),
  });

  const SetUserStatus = () => {
    console.log("In function");
  }

  return (
    <form className='w-full flex flex-col flex-grow justify-start items-center' onSubmit={handleSubmit(SetUserStatus)}>
      {formPage === 1 && (
        <PersonalDataOne
          setFromPage={setFormPage}
          weight={weight}
          setWeight={setWeight}
          height={height}
          setHeight={setHeight}
          age={age}
          setAge={setAge}
          register={register}
          errors={errors}
        />
      )}
      {formPage === 2 && (
        <PersonalDataTwo
          setFromPage={setFormPage}
          gender={gender}
          setGender={setGender}
          activityLevel={activityLevel}
          setActivityLevel={setActivityLevel}
          dietGoals={dietGoals}
          setDietGoals={setDietGoals}
          register={register}
          errors={errors}
        />
      )}
    </form>
  );
}

export default PersonalData;