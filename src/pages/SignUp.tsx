import React, { useState } from "react";
import SignUpUsername from "./sub_pages/SignUpUsername";
import SignUpCreatePassword from "./sub_pages/SignUpCreatePassword";
import HealthConditions from "./sub_pages/HealthConditions";

function SignUp() {
  // Form navigator state
  const [formNumber, setFormNumber] = useState(1);

  // For form sign up username
  const [username, setUsername] = useState("");

  // For form sign up create password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // For form sign up health conditions
  const [healthCondition, setHealthCondition] = useState<string[]>([]);
  const [allergy, setAllergy] = useState<string[]>([]);
  const [mealPreference, setMealPreference] = useState<string[]>([]);

  const handleWithGoogleClick = () => {};

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    // Handle form submission logic here
    console.log("Hello");
  }

  return (
    <div className="w-full flex-grow flex flex-col justify-start items-center">
      {formNumber !== 1 ? (
        formNumber === 2 ? (
          <SignUpCreatePassword
            setFormNumber={setFormNumber}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleWithGoogleClick={handleWithGoogleClick}
          />
        ) : (
          <HealthConditions
            healthCondition={healthCondition}
            setHealthCondition={setHealthCondition}
            allergy={allergy}
            setAllergy={setAllergy}
            mealPreference={mealPreference}
            setMealPreference={setMealPreference}
            handleSubmit={handleSubmit}
          />
        )
      ) : (
        <SignUpUsername
          setFormNumber={setFormNumber}
          username={username}
          setUsername={setUsername}
          handleWithGoogleClick={handleWithGoogleClick}
        />
      )}
    </div>
  );
}

export default SignUp;
