import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import locationicon from "../public/placeholder.png"
import TemperatureCard from './Components/TemperatureCard'
import axios from 'axios'
import BarChart from './Components/BarChart'

function App() {
  const [data,setData]=useState([])
  const [city,setCity]=useState({})
  const [main,setMain]=useState({})
  const [weather,setWeather]=useState({})
  const [wind,setWind]=useState({})
  const [chart,setChart]=useState({
    labels: [] ,
    datasets:[{
      label:"Hourley Tempreature Representaion",
      data:[36, 37, 34, 32, 31, 29, 32, 38],
      backgroundColor:["red","green","yellow"]
    }]
  })

  const getData=(position)=>{
    const lat=position.coords.latitude
    const long=position.coords.longitude
    const cnt=8
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=524901&lat=${lat}&lon=${long}&cnt=${cnt}&appid=99c871ee85cabab78c5488a06f6e7c73`)
    .then((res)=>{
      //  console.log(res.data.list[0])
      setData(res.data.list)
      setCity(res.data.city)
      setWeather(res.data.list[0].weather[0])
      setMain(res.data.list[0].main)
      setWind(res.data.list[0].wind)
      createChartData(res.data.list,chart)
      
    })
    .catch((e)=>{
      console.log(e)
    })
  }
  
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getData);
    } 
  }
  console.log(new Date(city.sunrise*1000).getHours())
  console.log(new Date(city.sunrise*1000))
  
 
  
  const createChartData=(data,chart)=>{
    let label=[]
    let value=[]
    data?.map((item)=>{
      label.push(item.dt_txt.split(" ")[1])
      value.push(Math.round((item.main.temp)-273.15))
          })
          
          chart.labels=label
          chart.datasets[0].data=value
          
 }
        
        
        // console.log(chart)
        useEffect(()=>{
          getLocation()
        },[])
        


  return (
    <div className="App">
          <div className='container' >
                <div className='box-1' >
                   <div className='location-image' ><img src={locationicon} /></div>
                   <div><p>{city.name} ,</p></div>
                   <div><p>{data[0]?.dt_txt.split(" ")[0]}</p></div>
                </div>

                <div className='box-2' >
                    <div className='cuurenttemp' >Current Temperature:{Math.round((main.temp)-273.15)}&deg;C</div>
                    <div className='status' >Current Weather:{weather.main}</div>
                    <div className='mintemp' >Low Temperature:{Math.round((main.temp_min)-273.15)}&deg;C</div>
                    <div className='maxtemp' >High Temperature:{Math.round((main.temp_max)-273.15)}&deg;C</div>
                    <div>Current Humidity:{main.humidity}</div>
                    <div>Current Pressure:{main.pressure}</div>
                    <div>Sunrise: {new Date(city.sunrise*1000).getHours()}:{new Date(city.sunrise*1000).getMinutes()} AM</div>
                    <div>Sunset: {new Date(city.sunset*1000).getHours()}:{new Date(city.sunrise*1000).getMinutes()} PM</div>
                   
                </div>

                <div className='box-3' >
                  {
                    data?.map((item,index)=><TemperatureCard key={index} main={item.main} wind={item.wind} weather={item.weather} date={item.dt_txt} />)
                  }
                </div>

                <div className='box-4' >
                  <BarChart chartData={chart} />
                </div>
          </div>
    </div>
  )
}

export default App
