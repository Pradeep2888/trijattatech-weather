import React from 'react'
import '../Style/Tempraturecardstyle.css'

function TemperatureCard({main,date,weather,wind}) {
  // console.log(wind)
  return (
    <div className='card' >
          <div><img src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} /></div>
          <div><p>{weather[0].main}</p></div>
          <div><p>{Math.round((main.temp)-273.15)}&deg;C</p></div>
          <div><p>Humidity:{main.humidity}</p></div>
          <div><p>Pressure:{main.pressure}</p></div>
          <div><p>Wind Speed:{wind.speed}km/h</p></div>
          <div><p>Time:{date.split(" ")[1]}</p></div>
          <div><p>Date:{date.split(" ")[0]}</p></div>
    </div>
  )
}

export default TemperatureCard