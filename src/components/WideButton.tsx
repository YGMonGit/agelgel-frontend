import React from 'react';

interface WideButtonProps {
  label: string,
  color: string,
  outline?: boolean;
  clickAction?: () => void;
  clickEvent?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function WideButton({ label, color, outline, clickAction, clickEvent }: WideButtonProps) {
  return (
    <div className='w-full mb-2'>
      <button className={`w-full rounded-lg ${color} py-3  border border-content-color ${outline ? "text-content-color" : "text-white"} text-[1.1rem] font-[500]`} onClick={clickAction ? clickAction : clickEvent}>{label}</button>
    </div>
  )
}

export default WideButton;