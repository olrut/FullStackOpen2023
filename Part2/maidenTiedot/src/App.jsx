import {useEffect, useState} from 'react'
import getCountries from "./services/getCountries.js";
import Search from "./components/Search.jsx";

const App = () => {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        getCountries.getAll()
            .then(response => {
                setCountries(response.data)
            }).catch(error => {
            console.log(error)
        })
    }, []);

    return (
        <div>
            <Search countries={countries}/>
        </div>
    )
}

export default App