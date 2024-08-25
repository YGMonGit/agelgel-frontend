import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularProgressProps {
  value: any;
  maxValue: number;
  image: any;
  nutrient: string;
  unit: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, maxValue, image, nutrient, unit }) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className='flex flex-col justify-start items-center'>
      <div className='p-2 relative' style={{ width: '70px', height: '70px' }}>
        <CircularProgressbar
          value={percentage}
          // text={`${value} kcal`}
          styles={{
            root: {},
            path: {
              stroke: `rgba(62, 152, 199, ${percentage / 100})`,
              strokeWidth: '8',
            },
            text: {
              fill: '#333',
              fontSize: '12px',
            },
            trail: {
              stroke: '#EEE',
              strokeWidth: '8',
            },
          }}
        />
        <img
          src={image}
          alt="Inside Circle"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
          }}
        />
      </div>
        <p className="text-slate-400 leading-none -mt-[5px] italic text-[.9rem]">{nutrient}</p>
        <p className="text-slate-500 text-[.9rem]">{parseFloat(value).toFixed(1)} {unit}</p>
    </div>
  );
};

export default CircularProgress;
