import React from 'react';
import {Doughnut,Line,HorizontalBar,Pie,Polar,Radar,Scatter} from 'react-chartjs-2';

export default function DoughnutBar({chartData}) {
  return (
    <div style={{width:800}}>
      <Doughnut data={chartData} />
      <br/><br/><br/><br/>
      <Line data={chartData} />
      <br/><br/><br/><br/>
      <HorizontalBar data={chartData} />
      <br/><br/><br/><br/>
      <Pie data={chartData} />
      <br/><br/><br/><br/>
      <Polar data={chartData} />
      <br/><br/><br/><br/>
      <Radar data={chartData} />
      <br/><br/><br/><br/>
      <Scatter data={chartData} />
    </div>
  )
}
