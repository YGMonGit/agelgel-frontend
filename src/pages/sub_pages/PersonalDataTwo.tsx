import React from 'react'
import SpaceOne from "../../assets/images/space-1.png";
import { EActivityLevel, EDietGoals, EGender } from "../../api/types/mealPreference.type";
import { FormControl, MenuItem, Select } from "@mui/material";
import WideButton from '../../components/WideButton';
import WideLink from '../../components/WideLink';
import { useNavigate } from 'react-router-dom';
import { mealPlannerUrl } from '../../assets/data';
import ClipLoader from 'react-spinners/ClipLoader';

interface PersonalDataTwoProps {
  setFromPage: React.Dispatch<React.SetStateAction<number>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  activityLevel: string;
  setActivityLevel: React.Dispatch<React.SetStateAction<string>>;
  dietGoals: string;
  setDietGoals: React.Dispatch<React.SetStateAction<string>>;
  register: any;
  errors: any;
  isLoading?: boolean;
}

function PersonalDataTwo({ setFromPage, gender, setGender, activityLevel, setActivityLevel, dietGoals, setDietGoals, register, errors, isLoading }: PersonalDataTwoProps) {

  const navigate = useNavigate();
  const onGenderChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setGender(e.target.value);
  const onActivityLevelChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setActivityLevel(e.target.value);
  const onDietGoalsChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDietGoals(e.target.value);

  const genderOptions = Object.values(EGender);
  const activityLevelOptions = Object.values(EActivityLevel);
  const dietGoalsOptions = Object.values(EDietGoals);

  const errorStyle = "text-[.8rem] text-red-400";

  const onBackClick = () => setFromPage(1);
  const onDoneClick = () => navigate(mealPlannerUrl);
  return (
    <div className="w-full flex flex-col flex-grow justify-start items-center">
      <img src={SpaceOne} alt="pic" className="w-full p-9 pt-12 max-w-[450px]" />
      <div className="w-full px-5 flex flex-col justify-center items-start gap-2">
        <p className="text-[1.1rem] font-semibold">Gender</p>
        <FormControl
          fullWidth
          sx={{
            borderRadius: "0.75rem",
            marginBottom: "1.25rem",
            backgroundColor: "#F9FAFB",
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.75rem",
              "& fieldset": {
                borderColor: "#D1D5DB",
              },
              "&:hover fieldset": {
                borderColor: "#D1D5DB",
              },
              "&.Mui-focused fieldset": {
                border: "1px solid #D1D5DB",
              },
            },
          }}
          className='dark:bg-neutral-800 text-white'
        >
          <Select
            value={gender}
            onChange={onGenderChange as any}
            displayEmpty
            sx={{
              "& .MuiSelect-select": {
                borderRadius: "0.75rem",
              },
            }}
          >
            {genderOptions?.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
          {errors && errors.gender && (
            <p className={errorStyle}>{errors.gender.message}</p>
          )}
        </FormControl>
      </div>
      <div className="w-full px-5 flex flex-col justify-center items-start gap-2">
        <p className="text-[1.1rem] font-semibold">Activity Level</p>
        <FormControl
          fullWidth
          sx={{
            borderRadius: "0.75rem",
            marginBottom: "1.25rem",
            backgroundColor: "#F9FAFB",
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.75rem",
              "& fieldset": {
                borderColor: "#D1D5DB",
              },
              "&:hover fieldset": {
                borderColor: "#D1D5DB",
              },
              "&.Mui-focused fieldset": {
                border: "1px solid #D1D5DB",
              },
            },
          }}
          className='dark:bg-neutral-800'
        >
          <Select
            value={activityLevel}
            onChange={onActivityLevelChange as any}
            displayEmpty
            sx={{
              "& .MuiSelect-select": {
                borderRadius: "0.75rem",
              },
            }}
          >
            {activityLevelOptions?.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
          {errors && errors.activityLevel && (
            <p className={errorStyle}>{errors.activityLevel.message}</p>
          )}
        </FormControl>
      </div>
      <div className="w-full px-5 flex flex-col justify-start items-start gap-2 flex-grow">
        <p className="text-[1.1rem] font-semibold">Diet Goals</p>
        <FormControl
          fullWidth
          sx={{
            borderRadius: "0.75rem",
            marginBottom: "1.25rem",
            backgroundColor: "#F9FAFB",
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.75rem",
              "& fieldset": {
                borderColor: "#D1D5DB",
              },
              "&:hover fieldset": {
                borderColor: "#D1D5DB",
              },
              "&.Mui-focused fieldset": {
                border: "1px solid #D1D5DB",
              },
            },
          }}
          className='dark:bg-neutral-800'
        >
          <Select
            value={dietGoals}
            onChange={onDietGoalsChange as any}
            displayEmpty
            sx={{
              "& .MuiSelect-select": {
                borderRadius: "0.75rem",
              },
            }}
          >
            {dietGoalsOptions?.map((type) => (
              <MenuItem key={type} value={type}>
                {type.replace(/_/g, " ")}
              </MenuItem>
            ))}
          </Select>
          {errors && errors.diet_goals && (
            <p className={errorStyle}>{errors.diet_goals.message}</p>
          )}
        </FormControl>
      </div>
      <div className="w-full px-5 mb-5 flex justify-center items-end gap-2">
        <WideLink label="Back" color="dark:bg-neutral-900 bg-white" outline={true} clickAction={onBackClick} />
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
              label="Finish"
              color="bg-content-color"
            />
          )}
        {/* <WideButton label="Finish" color="bg-content-color" /> */}
      </div>
    </div>
  )
}

export default PersonalDataTwo