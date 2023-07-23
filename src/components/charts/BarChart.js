import React from 'react';
import {Bar} from 'react-chartjs-2';

export default function BarChart({chartData}) {
  return (
    <div style={{width:800}}>
      <Bar data={chartData} />
    </div>    
  )
}
