import React from 'react';

interface ChoiceProps {
  label: string;
  data: string[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function Choice({ label, data, value, setValue }: ChoiceProps) {
  const handleClick = (item: string) => {
    setValue(item);
  };

  return (
    <div className="w-full px-5 flex flex-col justify-start items-start gap-1 mb-6 relative">
      <label className="text-base font-semibold mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {data.map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(item)}
            className={`
              px-3 py-1 rounded-lg text-sm font-medium
              ${item === value
                ? 'bg-green-200 text-green-700'
                : 'bg-[#F3F4F6] text-gray-700'}
              transition-colors duration-200 ease-in-out
            `}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Choice;