import React, { useState } from 'react'
import { Input } from '../components/Input';
import PageHeader from '../components/PageHeader';
import WideButton from '../components/WideButton';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { useChangePasswordMutation } from '../api/slices/user.slices';
import ClipLoader from 'react-spinners/ClipLoader';

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const onOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setOldPassword(e.target.value);

  const [ChangePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await ChangePassword({ oldPassword, newPassword: password });
    } catch (error) {
      console.error(error);
    }
  }




  return (
    <div className="w-full flex-grow flex flex-col justify-start items-center pb-5">
      <PageHeader
        header="Change Password"
        detail="CHange your password here"
      />
      <div className="w-full flex flex-col justify-start items-center flex-grow">
        <div className='w-full px-5 flex flex-col justify-start items-center py-2'>
          <p className='border-b w-full'></p>
          <p className='text-slate-400 italic font-light -mt-3 bg-white dark:bg-neutral-900 px-5'>
            Current Password
          </p>
        </div>
        <Input
          label="Old Password"
          placeholder="old_password"
          value={oldPassword}
          isPassword={true}
          showPassword={showOldPassword}
          onChange={onOldPasswordChange}
        // register={register}
        // errors={errors.password}
        // errors={errors.first_name}
        >
          <div
            className="text-[#6B7280] text-[1.3rem] absolute top-0 right-2 h-full flex justify-end items-center cursor-pointer border-0 bg-transparent"
            onClick={() => setShowOldPassword(!showOldPassword)}
          >
            {showOldPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
          </div>
        </Input>
        <div className='w-full px-5 flex flex-col justify-start items-center py-2'>
          <p className='border-b w-full'></p>
          <p className='text-slate-400 italic font-light -mt-3 bg-white dark:bg-neutral-900 px-5'>
            New Password
          </p>
        </div>
        <Input
          label="Password"
          placeholder="password"
          value={password}
          isPassword={true}
          showPassword={showPassword}
          onChange={onPasswordChange}
        // register={register}
        // errors={errors.password}
        // errors={errors.first_name}
        >
          <div
            className="text-[#6B7280] text-[1.3rem] absolute top-0 right-2 h-full flex justify-end items-center cursor-pointer border-0 bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
          </div>
        </Input>
        <Input
          label="Confirm Password"
          placeholder="confirm_password"
          value={confirmPassword}
          isPassword={true}
          showPassword={showCPassword}
          onChange={onConfirmPasswordChange}
        // register={register}
        // errors={errors.confirm_password}
        >
          <div
            className="text-[#6B7280] text-[1.3rem] absolute top-0 right-2 h-full flex justify-end items-center cursor-pointer border-0 bg-transparent"
            onClick={() => setShowCPassword(!showCPassword)}
          >
            {showCPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
          </div>
        </Input>
      </div>
      <div className="w-full px-5 flex justify-center items-end gap-2">
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
              clickEvent={onSubmit}
            />
          )}
      </div>
    </div>
  )
}

export default UpdatePassword