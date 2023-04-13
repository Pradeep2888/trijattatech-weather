import React from 'react'
import { Bar, Line } from 'react-chartjs-2'
import {Chart as Chart} from "chart.js/auto"

function BarChart({chartData}) {
  return (
    <>
    <Line data={chartData}/>
    </>
  )
}

export default BarChart