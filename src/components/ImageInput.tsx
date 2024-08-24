import React, { useState, useCallback } from "react";
import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";
import upload_logo from "../assets/icons/upload-logo.png";

interface ImageInputProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  register: any;
  setValue: any;
}

const ImageInput = ({images, setImages}: ImageInputProps) => {
  // const [images, setImages] = useState<string[]>([]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    let files: FileList | null = null;
    if ('dataTransfer' in e) {
      files = e.dataTransfer.files;
    } else if ('target' in e && e.target instanceof HTMLInputElement) {
      files = e.target.files;
    }

    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prevImages => [...prevImages, ...newImages]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileInput(e);
  }, [handleFileInput]);

  const removeImage = useCallback((index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  }, []);

  return (
    <div
      className="w-full flex flex-col justify-center items-center py-10 border-2 border-dashed border-dashed-4 border-[#D1D5DB] bg-[#F9FAFB] rounded-lg mb-6"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        id="imageUpload"
        onChange={handleFileInput}
      />
      
      {images.length === 0 ? (
        <>
          <img src={upload_logo} alt="upload logo pic" className="w-[33px] mb-4" />
          <h2 className="font-semibold text-slate-400 text-[.9rem]">
            Click to Upload <span className="font-normal">or drag and drop</span>
          </h2>
          <h2 className="font-semibold text-slate-400 text-[.9rem]">
            Max. file Size: 10MB
          </h2>
        </>
      ) : (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Uploaded pic ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                <IoCloseCircle size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <label
        htmlFor="imageUpload"
        className="flex justify-center items-center h-full bg-content-color leading-none text-[1rem] px-3 py-[10px] mt-4 border outline-none rounded-lg border-[#D1D5DB] gap-1 text-white cursor-pointer"
      >
        <IoSearchOutline className="text-white text-[1.1rem]" />
        Browse File
      </label>
    </div>
  );
}

export default ImageInput;