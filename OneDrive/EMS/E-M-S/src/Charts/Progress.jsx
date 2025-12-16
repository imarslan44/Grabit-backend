import React from 'react';
import GaugeChart from 'react-gauge-chart';

function Progress({className}) {
  return (
    <div className={` bg-white rounded-xl  p-4 relative ${className}`}>
      <h1 className='text-center text-3xl font-bold py-8 '>Progress</h1>
      <GaugeChart 
        id="gauge-chart" 
        nrOfLevels={20} 
        percent={1} 
        colors={['#FF5F6D', '#FFC371']} 
        arcWidth={0.3} 
        textColor="#000" 
        style={{ width: '100%', height: 'auto', margin: "100px 0 0 0"
        }} // Make the chart responsive
      />
      <div className='flex justify-between pr-5 pl-7 relative'>
      <div className=" bottom-10  text-sm font-bold">0%</div>
      <div className=" bottom-0 right-0 text-sm font-bold">100%</div>
      </div>
    </div>
  );
}

export default Progress;