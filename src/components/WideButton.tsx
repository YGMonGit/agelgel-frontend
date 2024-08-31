import React from 'react';

interface WideButtonProps {
  label: any;
  color: string;
  borderColor?: string;
  disable?: boolean;
  outline?: boolean;
  clickAction?: () => void;
  clickEvent?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function WideButton({ label, color, borderColor="", disable=false, outline, clickAction, clickEvent }: WideButtonProps) {
  return (
    <div className='w-full mb-2'>
      <button disabled={disable} className={`w-full rounded-lg ${color} py-3  border ${borderColor === "" ? "border-content-color" : borderColor } ${outline ? "text-content-color" : "text-white"} text-[1.1rem] font-[500]`} onClick={clickAction ? clickAction : clickEvent}>{label}</button>
    </div>
  )
}

export default WideButton;