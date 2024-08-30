import React, { useEffect } from 'react';

interface ChoiceProps {
  label: string;
  data: string[];
  value: string | string[] | undefined;
  setValues: any;
  multiSelect: boolean;
  noPad?: boolean;
}

function Choice({ label, data, value, setValues, multiSelect, noPad }: ChoiceProps) {
  const handleClick = (item: string) => {
    if (multiSelect) {
      setValues((prevValue: any) => {
        const lowercasePrevValue = Array.isArray(prevValue)
          ? prevValue.map(v => v.toLowerCase())
          : [];
        const lowercaseItem = item.toLowerCase();

        if (lowercasePrevValue.includes(lowercaseItem)) {
          return prevValue.filter((v: string) => v.toLowerCase() !== lowercaseItem);
        } else {
          if (prevValue == undefined) {
            return [item];
          }
          return [...prevValue, item];
        }
      });
    } else {
      setValues(item);
    }
  };

  const isSelected = (item: string) => {
    if (multiSelect) {
      return Array.isArray(value) && value.some(v => v.toLowerCase() === item.toLowerCase());
    } else {
      return value?.includes(item);
    }
  };

  return (
    <div className={`w-full ${!noPad && "px-5"} flex flex-col justify-start items-start gap-1 mb-6 relative select-none cursor-pointer`}>
      <label className="text-base font-semibold mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {data.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item)}
            className={`
              px-3 py-1 rounded-lg text-sm font-medium
              ${isSelected(item)
                ? 'bg-green-200 text-green-700'
                : 'bg-[#F3F4F6] text-gray-700'}
              transition-colors duration-200 ease-in-out
            `}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Choice;