import React, { useEffect, useState } from 'react';
import PersonalDataOne from './sub_pages/PersonalDataOne';
import PersonalDataTwo from './sub_pages/PersonalDataTwo';
import { EGender, IUserStats } from '../api/types/mealPreference.type';
import { set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddMealPreferenceSchema } from '../validation/mealPreference.validation';
import { useCreateMealPlanMutation } from '../api/slices/mealPlanner.slices';
import { useNavigate } from 'react-router-dom';
import { mealPlannerUrl } from '../assets/data';

function PersonalData() {

  const navigate = useNavigate();

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

  const [CreateMealPlan] = useCreateMealPlanMutation();
  const [serverError, setServerError] = useState<string | null>(null);
  console.log({ errors, serverError });

  console.log({ errors });

  const SetUserStatus = async (data: IUserStats) => {
    console.log(data);
    try {
      const res = await CreateMealPlan({ mealPlanData: data }).unwrap()
      console.log('success', res)
      navigate(mealPlannerUrl);
    } catch (error: any) {
      if (!error.data.error) return;
      const err = error.data.error;
      if (err.type === "Validation") {
        setError(err.attr, { message: err.error });
      } else {
        setServerError(err.msg);
      }
    }

  }

  useEffect(() => {
    setValue("gender", gender as any);
  }, [gender]);

  useEffect(() => {
    setValue("activityLevel", activityLevel as any);
  }, [activityLevel]);

  useEffect(() => {
    setValue("diet_goals", dietGoals as any);
  }, [dietGoals]);

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
          control={control}
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