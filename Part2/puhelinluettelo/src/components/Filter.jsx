const Filter = ({nameFilter, setNameFilter}) => {
    const handleNameFilter = (event) => {
        setNameFilter(event.target.value.toLowerCase())
    }

    return (
        <div>
            filter shown with
            <input value={nameFilter} onChange={handleNameFilter}/>
        </div>
    )
}

export default Filter