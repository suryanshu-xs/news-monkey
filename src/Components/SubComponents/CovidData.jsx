import React, { useEffect, useState } from 'react'



const CovidData = ({ selectedCountry }) => {

    const [worldCovidData, setWorldCovidData] = useState(null)
    const [countryCovidData, setCountryCovidData] = useState(null)

    useEffect(() => {
        fetch('https://corona.lmao.ninja/v2/all?yesterday', {
            method: 'GET'
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    setWorldCovidData(data)
                })
            } else {
                setWorldCovidData(null)
            }
        })

    }, [])
    useEffect(() => {
        fetch(`https://corona.lmao.ninja/v2/countries/${selectedCountry.country}?yesterday=true&strict=true&query`, {
            method: 'GET'
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    setCountryCovidData(data)
                })
            } else {
                setCountryCovidData(null)
            }
        })
    }, [selectedCountry])

    return (
        <div className='covid-data-container' >

            {
                worldCovidData ? <div className="covid-world-report cases-container">

                    <p className="report-heading">
                        World Covid Report
                    </p>
                    <div className='cases-wrapper' >
                        <div className="top-report report-wrapper">
                            <span className='cases' >Total : {worldCovidData.cases}</span>
                            <span className='deaths' >Deaths : {worldCovidData.deaths}</span>
                        </div>
                        <div className="bottom-report report-wrapper">
                            <span className='cured' >Cured : {worldCovidData.recovered} </span>
                            <span className='critical' >Critical : {worldCovidData.critical}</span>
                        </div>
                    </div>
                </div> : <></>
            }

            {
                countryCovidData ? <div className="covid-country-report cases-container">

                    <p className="report-heading">
                        {selectedCountry.country}'s Covid Report
                    </p>
                    <div className='cases-wrapper' >
                        <div className="top-report report-wrapper">
                            <span className='cases' >Total : {countryCovidData.cases}</span>
                            <span className='deaths' >Deaths : {countryCovidData.deaths}</span>
                        </div>
                        <div className="bottom-report report-wrapper">
                            <span className='cured' >Cured : {countryCovidData.recovered} </span>
                            <span className='critical' >Critical : {countryCovidData.critical}</span>
                        </div>
                    </div>
                </div> : <></>
            }

        </div>
    )
}

export default CovidData
