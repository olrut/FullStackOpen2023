import {useState} from "react";
import getPersons from "../services/getPersons.js";

const PersonForm = ({persons, setPersons, setNotification, setError}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const emptyForm = () => {
        setNewName('')
        setNewNumber('')
    }

    const setErrorMessage = (message) => {
        setError(message)
        setTimeout(() => {
            setError(null)
        }, 5000)
    }

    const setNotificationMessage = (message) => {
        setNotification(message)
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: newNumber,
        }

        if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const personId = persons.find(
                    person => person.name.toLowerCase() === newName.toLowerCase()).id
                getPersons.update(personId, nameObject)
                    .then(response => {
                        setNotificationMessage(`${newName} updated`)
                        setPersons(persons.map(
                            person => person.id !== response.data.id ? person : response.data))
                    })
                    .catch(error => {
                        setErrorMessage(error.response.data.error)
                    })
            }
        } else {
            getPersons.create(nameObject)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNotification(`${newName} added`)
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })
                .catch(error => {
                        setError(error.response.data.error)
                        setTimeout(() => {
                            setError(null)
                        }, 5000)
                    }
                )
        }
        emptyForm()
    }

    return (
        <form onSubmit={addPerson}>
            <div>
                name:
                <input value={newName} onChange={handleNameChange}
                />
            </div>
            <div>number:
                <input value={newNumber} onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
export default PersonForm