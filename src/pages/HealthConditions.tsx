import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Checkbox } from "../components/ui/checkbox";

function HealthConditions() {
  const [rememberDiabetes, setRememberDiabetes] = useState(false);
  const [rememberLI, setRememberLI] = useState(false);
  
  const handleLIToggle = () => setRememberLI(!rememberLI);
  const handleDiabetesToggle = () => setRememberDiabetes(!rememberDiabetes);
  return (
    <div className="w-full flex flex-col flex-grow justify-start items-center">
      <PageHeader header="Health conditions & Preferences" detail="Helps with our suggestions." />
      <div className="w-full px-5 flex flex-col justify-start items-start">
        <p className="select-none font-[500] text-[1.1rem] mt-3">Please enter your health condition(s)</p>
        <label
          htmlFor="terms"
          className="flex justify-start flex-wrap py-3 items-center gap-1 text-[1rem] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-700 font-[500]"
        >
          <Checkbox id="terms" className="border-0 bg-[#F9FAFB] mr-1" onClick={handleDiabetesToggle} />
          <span className="select-none">Diabetes</span>
          <p className="w-full pl-7 text-slate-400 text-[.9rem] font-normal leading-5">You could either be Type I or Type II, we’ve got you covered.</p>
        </label>
        <label
          htmlFor="terms"
          className="flex justify-start flex-wrap py-3 items-center gap-1 text-[1rem] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-700 font-[500]"
        >
          <Checkbox id="terms" className="border-0 bg-[#F9FAFB] mr-1" onClick={handleLIToggle} />
          <span className="select-none">Lactose Intolerance</span>
          <p className="w-full pl-7 text-slate-400 text-[.9rem] font-normal leading-5">Inability to digest lactose, which may result in abdominal pain, bloating and diarrhoea after consuming milk and other dairy products. Affects 65% of the human population.</p>
        </label>
      </div>
    </div>
  );
}

export default HealthConditions;
