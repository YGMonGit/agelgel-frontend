import React, { Children } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface AlertDialogBoxProps {
  title?: string;
  detail?: string;
  cancelContent?: string;
  buttonContent?: string;
  closeDialog: () => void;
  handleAction?: () => Promise<void>;
  handleClick?: () => void;
  isLoading: any;
  single?: boolean; 
  children?: React.ReactNode;
}

function AlertDialogBox({ title, detail, cancelContent, buttonContent, closeDialog, handleAction, handleClick, isLoading, single=false, children }: AlertDialogBoxProps) {
  const handleSingleSpace = () => {
    if (single) {
      closeDialog();      
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-40 h-screen w-screen z-20 flex justify-center items-center" onClick={handleSingleSpace}>
      <div className="w-[90%] max-w-[500px] bg-white dark:bg-neutral-950 dark:border-neutral-700 py-5 px-3 rounded-xl flex flex-col justify-start items-center xs:items-start" onClick={handleContentClick}>
        <p className="w-full px-2 text-[1.3rem] font-semibold">
          {title}
        </p>
        <p className="w-full px-2 text-[1rem] text-slate-500 font-semibold">
          {detail}
        </p>
        {children}
        <div className="w-full flex flex-col xs:flex-row justify-end items-end gap-2 mt-4">
          {!single && (
            <button
              className="w-full xs:w-auto px-5 text-[1.2rem] h-[40px] rounded-xl bg-neutral-900 text-white flex justify-center items-center xs:order-1 order-2"
              onClick={closeDialog}
            >
              {cancelContent}
            </button>
          )}
          <button
            className="w-full xs:w-auto px-5 text-[1.2rem] h-[40px] bg-red-700 text-white rounded-xl xs:order-2 order-1"
            onClick={handleAction ? handleAction : handleClick}
          >
            {isLoading ? (
              <div className="flex justify-center items-center w-full h-full gap-2">
                <ClipLoader
                  color={"white"}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <p className="text-white text-[1.1rem] italic">loading ...</p>
              </div>
            ) : (
              <span>{buttonContent}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertDialogBox;
