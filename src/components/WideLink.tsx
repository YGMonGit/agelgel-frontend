import React from 'react';

interface WideLinkProps {
  label: string,
  color: string,
  outline?: boolean;
  clickAction?: () => void;
}

function WideLink({ label, color, outline, clickAction }: WideLinkProps) {
  return (
    <div className='w-full mb-2'>
      <div className={`w-full flex justify-center items-center rounded-lg ${color} py-3  border border-content-color ${outline ? "text-content-color" : "text-white"} text-[1.1rem] font-[500]`} onClick={clickAction}>{label}</div>
    </div>
  )
}

export default WideLink;