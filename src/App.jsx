import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const API_KEY = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=77baebbe4005f490e0945cb83778aa92`;

  const searchLocation = (e) => {
    if(e.key === 'Enter') {
      axios.get(API_KEY)
        .then(res => {
          setData(res.data)
          console.log(res.data)
        })      
        setLocation('')
    }
  }
  // const temp = (data.main.temp - 273.15).toFixed(0)

  return (
    <div className='app'>
    <div className="search">
      <input 
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder='Enter Location'
        onKeyPress={e => searchLocation(e)}
        type='text'/>
    </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className='temp'>   
            {data.main ? <h1>{(data.main.temp - 273.15).toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{(data.main.feels_like - 273.15).toFixed()} °C</p> : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{(data.main.humidity)} %</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{(data.wind.speed).toFixed(2)} км/ч</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>} 
      </div>
    </div>
  )
}

export default App
