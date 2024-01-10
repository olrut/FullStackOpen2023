import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import Notification from "./components/Notification.jsx";
import Error from "./components/Error.jsx";
import getPersons from "./services/getPersons.js";

const App = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
            getPersons.getAll().then(response => {
                setPersons(response.data)
            });
        }, []
    )
    const [nameFilter, setNameFilter] = useState('')
    const [notification, setNotification] = useState(null)
    const [error, setError] = useState(null)


    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification}/>
            <Error message={error}/>
            <Filter
                nameFilter={nameFilter}
                setNameFilter={setNameFilter}/>
            <h3>add a new</h3>
            <PersonForm
                persons={persons}
                setPersons={setPersons}
                setNotification={setNotification}
                setError={setError}/>
            <h3>Numbers</h3>
            <Persons
                persons={persons}
                nameFilter={nameFilter}
                setPersons={setPersons}
                setNotificaiton={setNotification}/>
        </div>
    )
}

export default App