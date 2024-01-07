import {useState} from "react";
import CountryInfo from "./CountryInfo.jsx";
import ShowButton from "./ShowButton.jsx";

const Search = ({countries}) => {
    const [search, setSearch] = useState('')
    const [filteredCountries, setFilteredCountries] = useState([])

    const handleSearch = (event) => {
        setSearch(event.target.value)
        const filtered = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
        setFilteredCountries(filtered)
    }


    return (
        <div>
            find countries
            <div>
                <input value={search} onChange={handleSearch}/>
            </div>
            <div>
                {filteredCountries.length > 10 ? 'Too many matches, specify another filter' :
                    filteredCountries.length === 1 ? <CountryInfo country={filteredCountries[0]} /> :
                    filteredCountries.map(country =>
                        <p key={country.name.common}>{country.name.common}
                            <ShowButton
                                setFilteredCountries = {setFilteredCountries}
                                setSearch={setSearch}
                                country = {country}/>
                        </p>)}
            </div>

        </div>
    )

}
export default Search