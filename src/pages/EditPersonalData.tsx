import React, { useEffect, useState } from 'react';
import PersonalDataOne from './sub_pages/PersonalDataOne';
import PersonalDataTwo from './sub_pages/PersonalDataTwo';
import { IMealPlannerUpdateFrom } from '../api/types/mealPreference.type';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateMealPreferenceSchema } from '../validation/mealPreference.validation';
import { useMyMealPlanQuery, useUpdateStatsMutation } from '../api/slices/mealPlanner.slices';
import { useNavigate } from 'react-router-dom';
import { mealPlannerUrl } from '../assets/data';
function EditPersonalData() {

  const navigate = useNavigate();

  const [formPage, setFormPage] = useState(1);
  const [height, setHeight] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("");
  const [dietGoals, setDietGoals] = useState<string>("");

  const { data: mealPlan } = useMyMealPlanQuery();

  useEffect(() => {
    if (!mealPlan) return;
    setHeight(mealPlan.userStats?.height || 0);
    setAge(mealPlan.userStats?.age || 0);
    setGender(mealPlan.userStats?.gender || "");
    setActivityLevel(mealPlan.userStats?.activityLevel || "");
    setDietGoals(mealPlan.userStats?.diet_goals || "");
  }, [mealPlan]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm<Omit<IMealPlannerUpdateFrom, "weight">>({
    resolver: zodResolver(updateMealPreferenceSchema),
  });

  const [UpdateStats] = useUpdateStatsMutation();
  const [serverError, setServerError] = useState<string | null>(null);
  console.log({ errors, serverError });

  console.log({ errors });

  const SetUserStatus = async (data: IMealPlannerUpdateFrom) => {
    console.log(data);
    try {
      const res = await UpdateStats({ statsData: data }).unwrap()
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
          showWeight={false}
          setFromPage={setFormPage}
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

export default EditPersonalData;