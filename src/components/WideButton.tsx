import React from 'react';

interface WideButtonProps {
  label: string,
  color: string,
}

function WideButton({ label, color }: WideButtonProps) {
  return (
    <div className='w-full px-5 mb-2'>
      <button className={`w-full rounded-lg ${color} py-3 text-white text-[1.1rem] font-[500]`}>{label}</button>
    </div>
  )
}

export default WideButton;