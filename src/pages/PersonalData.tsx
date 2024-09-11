import React, { useState } from 'react';
import WeightInput from './WeightInput';
import PersonalDataOne from './sub_pages/PersonalDataOne';
import PersonalDataTwo from './sub_pages/PersonalDataTwo';

function PersonalData() {
  const [formPage, setFormPage] = useState(1);
  const pages = 2;
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  return (
    <div className='w-full flex flex-col flex-grow justify-start items-center'>
      {formPage === 1 && (
        <PersonalDataOne
          setFromPage={setFormPage}
          weight={weight}
          setWeight={setWeight}
          height={height}
          setHeight={setHeight}
        />
      )}
      {formPage === 2 && (
        <PersonalDataTwo
          // weight={weight}
          // setWeight={setWeight}
          // height={height}
          // setHeight={setHeight}
        />
      )}
      <div className='w-full flex justify-center items-center gap-1 py-20'>
        {Array.from({ length: pages }, (_, index) => (
          <div key={index} className={`w-6 aspect-square rounded-full ${formPage === index+1 ? "bg-content-color": "bg-[#39E6AB]"}`} onClick={() => setFormPage(index+1)}></div>
        ))}
      </div>
    </div>
  );
}

export default PersonalData;