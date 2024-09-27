import React, { useState, useCallback } from "react";
import { IoMdAdd } from "react-icons/io";

interface ProfileImageInputProps {
  defaultImage?: string;
  register?: any
  setValue: any
  image: string | undefined | null;
  setImage: React.Dispatch<React.SetStateAction<string | undefined | null>>;
}

const ProfileImageInput: React.FC<ProfileImageInputProps> = ({ register = (placeholder: string) => { }, setValue, image, setImage }) => {

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl)
      setValue("profile_img", file, { shouldValidate: true });
    }
  }, [setValue]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-32 mb-4 bg-red-30 w-full flex justify-center">
        {image ? (
          <img
            src={image}
            alt="User profile"
            className="w-32 h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-32 h-full bg-gray-200 dark:bg-neutral-800 rounded-full flex items-center justify-center">
            <span className="text-gray-500 text-4xl">?</span>
          </div>
        )}
        <label
          htmlFor="profileImageUpload"
          className="absolute flex justify-center -bottom-4 bg-content-color rounded-full p-2 cursor-pointer transition-colors"
        >
          <IoMdAdd size={20} color="white" />
        </label>
      </div>
      <input
        {...register("profile_img")}
        type="file"
        accept="image/*"
        className="hidden"
        id="profileImageUpload"
        onChange={handleFileInput}

      />
    </div>
  );
};

export default ProfileImageInput;