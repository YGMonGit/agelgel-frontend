import React, { useCallback } from "react";
import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";
import upload_logo from "../assets/icons/upload-logo.png";

interface ImageEditInputProps {
  images: string[];
  newImages: File[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setNewImages: React.Dispatch<React.SetStateAction<File[]>>;
  register: any;
  setValue: any;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (index: number) => void;
  handleRemoveNewImage: (index: number) => void;
}

const ImageEditInput = ({
  images,
  newImages,
  setImages,
  setNewImages,
  setValue,
  register,
  handleImageChange,
  handleRemoveImage,
  handleRemoveNewImage
}: ImageEditInputProps) => {
  console.log("hello");
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    console.log({files});
    
    if (files) {
      const newFiles = Array.from(files);
      setNewImages(prevNewImages => {
        console.log({newImage: [...prevNewImages, ...newFiles]});
        
        return [...prevNewImages, ...newFiles]});
      setValue("imgs", [...newImages, ...newFiles]);
      const newImageUrls = newFiles.map(file => URL.createObjectURL(file));
      setImages(prevImages => [...prevImages, ...newImageUrls]);
    }
  }, [newImages, setNewImages, setValue, setImages]);

  return (
    <div
      className="w-full flex flex-col justify-center items-center py-10 border-2 border-dashed border-dashed-4 border-[#D1D5DB] bg-[#F9FAFB] rounded-lg mb-6"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        {...register("imgs")}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        id="imageUpload"
        onChange={handleImageChange}
      />

      {images.length === 0 && newImages.length === 0 ? (
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
            <div key={`existing-${index}`} className="relative">
              <img
                src={image}
                alt={`Existing pic ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                <IoCloseCircle size={16} />
              </button>
            </div>
          ))}
          {newImages.map((file, index) => (
            <div key={`new-${index}`} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`New pic ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
              <button
                onClick={() => handleRemoveNewImage(index)}
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

export default ImageEditInput;