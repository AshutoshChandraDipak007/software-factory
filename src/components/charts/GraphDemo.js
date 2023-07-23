import React, { useState } from 'react'
import BarChart from './BarChart'
import {UserData} from "../../features/container/ChartData";
import DoughnutBar from './DoughnutBar';


export default function GraphDemo() {
  const[userData,setUserData]=useState({
    labels: UserData.map(data => data.year),
    datasets:[{
      label:"User Gain From Backend",
      data:UserData.map(data => data.userGain),
      backgroundColor:["rgba(75,192,192,1)","#ecf0f1","#50AF95","#f3ba2f","#2a71d0", "#50AF95"],
      borderWidth:.1,
      borderColor:"black"
    }]    
  });


  return (
    <div style={{paddingLeft:150}}>
      <BarChart chartData={userData} />      
      <DoughnutBar chartData={userData} />
    </div>
  )
}
