import {useEffect, useState} from "react";
import getForecast from "../services/getForecast.js";

const Forecast = ({capital, lat, lon}) => {
    const [weatherForecast, setWeatherForecast] = useState({
        temperature: 0,
        wind: 0,
        weather_icons: "",
    });

    useEffect(() => {
        getForecast.get(lat, lon).then(response => {
            const forecast = {
                temperature: response.data.main.temp,
                wind: response.data.wind.speed,
                weather_icons: response.data.weather[0].icon,
            }
            setWeatherForecast(forecast)
        })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>temperature: {Math.round(weatherForecast.temperature)} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherForecast.weather_icons}@2x.png`} alt="weather icon"/>
            <p>wind {weatherForecast.wind} m/s</p>
        </div>
    )
}

export default Forecast