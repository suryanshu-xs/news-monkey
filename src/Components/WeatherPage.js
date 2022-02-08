import React, { useState, useEffect } from 'react'
import Navbar from './SubComponents/Navbar'
import '../Style/weatherPage.css'
import SimpleSnackbar from './SubComponents/SnackBars'
import weatherConditions from '../Data/weatherCondition'
import { LinearProgress } from '@mui/material'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { dateFormatter, timeFormatter } from '../Data/functions'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';


const WeatherPage = ({ selectedCountry, setSelectedCountry, open, setOpen }) => {
    const [snackBarMessage, setSnackBarMessage] = useState('')
    const [current, setCurrent] = useState(null)
    const [forecastDay, setForecastDay] = useState(null)
    const [location, setLocation] = useState(null)
    const [backgroundImage, setBackgroundImage] = useState('')
    const [selectedCity, setSelectedCity] = useState(selectedCountry.capital)
    const [loading, setLoading] = useState(false)
    const [activeForecastBox, setActiveForecastBox] = useState(0)
    const [chartData, setChartsData] = useState(null)

 

    useEffect(() => {
        setSelectedCity(selectedCountry.capital)
    }, [selectedCountry])

    const key = process.env.REACT_APP_WEATHER_API_KEY
  


    useEffect(() => {
       
        document.title = 'Weather Report '+selectedCity
        setLoading(true)
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${selectedCity}&days=7&aqi=yes&alerts=yes`, {
            method: 'GET'
        }).then((res) => {

            if (res.ok) {
                res.json().then((data) => {

                    setForecastDay(data.forecast.forecastday)
                    setLocation(data.location)
                    setOpen(true)
                    setLoading(false)
                    setCurrent(data.current)
                    setSnackBarMessage(`Showing weather data for ${data.location.name}, ${data.location.country}.`)


                    if (backgroundImage === '') {
                        setBackgroundImage('https://images.unsplash.com/photo-1621468635836-494461c17b64?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')
                    }

                    if (data.current.is_day === 1) {
                        weatherConditions.filter(({ condition, image_url }) => {
                            if (condition === data.current.condition.text) {
                                setBackgroundImage(image_url)
                            }
                        });
                    } else {
                        setBackgroundImage('https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80')
                    }

                    setChartsData(data.forecast.forecastday.map((forecastDay, index) => {
                        let obj = []
                        for (let i = 0; i < forecastDay.hour.length; i++) {

                            if (i % 4 === 0) {

                                obj.push({
                                    time: timeFormatter(i + 1),
                                    Temperature: forecastDay.hour[i].temp_c
                                })
                            }

                        }
                        return obj
                    }));

                })
            } else {
                setForecastDay(null)
                setLocation(null)
                setOpen(true)
                setCurrent(null)
                setLoading(false)
                setSnackBarMessage('Failed to load weather data.')
            }
        })


    }, [selectedCity])


    return (
        <>
            <Navbar selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} setOpen={setOpen} searchPlaceHolder='City Name' setSelectedCity={setSelectedCity} disabled={false} setSnackBarMessage={setSnackBarMessage} />


            <div className='weather-main-container' style={{
                backgroundImage: `url(${backgroundImage})`
            }} >
                <div className='loading-box' >
                    {
                        loading ? <LinearProgress /> : <></>
                    }
                </div>
                <div className='weather-information-container' >

                    {
                        location ? <div className="name-region-temperature-condition">

                            <h2 className='name-region'> {location.name}, {location.country} </h2>
                            <div className="temperature-condition">

                                {
                                    current ? <>
                                        <div className='temperature' >
                                            <img src={current.condition.icon} alt="" className='temperature-condition-image' />
                                            <div className='temp-degree' >
                                                <span className='temp' >{current.temp_c}{"\u00B0"}</span>
                                                <span className='degree'> C </span>
                                            </div>

                                        </div>
                                        <h2 className='condition' >{current.condition.text}</h2>
                                        <p className="last-updated"> Last Updated  {current.last_updated.split(' ')[1]} </p>

                                        <div className='other-infos' >

                                            <span > Feels Like  {current.feelslike_c}{"\u00B0"} </span>
                                            <span > Wind {current.wind_kph}km/h {current.wind_dir} </span>
                                            <span > Visibility  {current.vis_km}km </span>
                                            <span > Pressure  {current.pressure_mb}mb </span>
                                            <span > Humidity  {current.humidity}% </span>
                                            <span > Gust  {current.gust_kph}km/h </span>
                                            <div className="progressBars">
                                                <div className='progress-bar' >
                                                    <CircularProgressbar
                                                        value={current.air_quality[Object.keys(current.air_quality)[Object.keys(current.air_quality).length - 2]]}

                                                        maxValue={10}
                                                        text={`${current.air_quality[Object.keys(current.air_quality)[Object.keys(current.air_quality).length - 2]]}/10`}

                                                        styles={buildStyles({
                                                            textColor: 'white',
                                                            textSize: '23px',
                                                        })}
                                                    />
                                                    <p className="index-name"> Air Quality Index </p>
                                                </div>
                                                <div className='progress-bar' >
                                                    <CircularProgressbar
                                                        value={current.uv}

                                                        maxValue={10}
                                                        text={`${current.uv}/10`}

                                                        styles={buildStyles({
                                                            textColor: 'white',
                                                            textSize: '23px',
                                                        })}
                                                    />
                                                    <p className="index-name"> UV Index </p>
                                                </div>
                                            </div>

                                        </div>

                                    </> : <></>
                                }
                            </div>



                        </div> : <></>
                    }

                    {
                        forecastDay ? <>
                            <div className="forecast-container">

                                <div className="forecast-day-container">
                                    {
                                        forecastDay.map((forecastObj, index) => <div
                                            className={`forecast-day-div ${activeForecastBox === index ? 'activeForecastBox' : ''}`}
                                            key={index}
                                            onClick={() => setActiveForecastBox(index)}
                                        >

                                            <p className='forecast-day-date'>{dateFormatter(forecastObj.date)}
                                            </p>

                                            <img src={forecastObj.day.condition.icon} alt="" className='forecast-day-icon' />

                                            <div className="highest-lowest-temp">
                                                <span className="highest-temp">
                                                    {Math.round(forecastObj.day.maxtemp_c)}{"\u00B0"}
                                                </span>
                                                <span className="lowest-temp">
                                                    {Math.round(forecastObj.day.mintemp_c)}{"\u00B0"}
                                                </span>
                                            </div>

                                            <p className="forecast-day-condition">
                                                {
                                                    forecastObj.day.condition.text.split(' ').length > 2 ? forecastObj.day.condition.text.split(' ')[0] + ' ' + forecastObj.day.condition.text.split(' ')[1] : forecastObj.day.condition.text


                                                }
                                            </p>


                                        </div>)
                                    }

                                </div>
                                {
                                    chartData ? <div className="charts-container">
                                        <ResponsiveContainer height='100%' aspect={3.5} >
                                            <LineChart width={700} height={300} data={chartData[activeForecastBox]} margin={{
                                                right: 20
                                            }} >
                                                <Line type='monotone' dataKey={'Temperature'} stroke='white' strokeWidth={2} />
                                                <XAxis dataKey={'time'} stroke='white' interval={'preserveStartEnd'} />
                                                <Tooltip contentStyle={{
                                                    backgroundColor: 'transparent',
                                                    fontSize: '0.9rem',
                                                    padding: '0.35rem'
                                                }} />
                                                <YAxis stroke='white' />

                                            </LineChart>

                                        </ResponsiveContainer>
                                    </div> : <></>
                                }

                            </div>
                        </> : <></>
                    }



                </div>


            </div>
            <SimpleSnackbar open={open} setOpen={setOpen} message={snackBarMessage} />
        </>
    )
}


export default WeatherPage
