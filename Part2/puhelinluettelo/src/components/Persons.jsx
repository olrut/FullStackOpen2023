import DelButton from "./DelButton.jsx";

const Persons = ({persons, nameFilter, setPersons, setNotificaiton}) => {
    return (
        <div>
            {persons.filter(
                person => person.name.toLowerCase().includes(nameFilter)).map(person =>
                <p key={person.name}>{person.name} {person.number}
                    <DelButton
                        id={person.id} name={person.name} persons={persons}
                        setPersons={setPersons}
                        setNotificaiton ={setNotificaiton} />
                </p>)
            }
        </div>
    )
}

export default Persons