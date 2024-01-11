import Forecast from "./Forecast.jsx";

const CountryInfo = ({country}) => {

    return (
        <>
            <div>
                <h2>{country.name.common}</h2>
                <p>capital {country.capital} <br/> area {country.area}</p>
                <h3>languages</h3>
                <ul>
                    {Object.values(country.languages).map((language) => (
                        <li key={language}>{language}</li>
                    ))}
                </ul>
                <img src={country.flags.svg} alt={country.flags.alt} width="200"/>
            </div>
            <div>
                <Forecast
                    capital={country.capital}
                    lat={country.latlng[0]}
                    lon={country.latlng[1]}
                />
            </div>
        </>
    )
}

export default CountryInfo;
