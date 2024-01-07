import getPersons from "../services/getPersons.js";
const DelButton = ({id, name, persons, setPersons, setNotificaiton}) => {
    const handleDelete = () => {
        if (window.confirm(`Delete ${name}?`)) {
            getPersons.deletePerson(id)
                .then(() => {
                    setNotificaiton(`${name} deleted`)
                    setTimeout(() => {
                        setNotificaiton(null)
                    }, 5000)
                    setPersons(persons.filter(person => person.name !== name))
                })
        }
    }

    return (
        <button onClick={handleDelete}>delete</button>
    )
}

export default DelButton