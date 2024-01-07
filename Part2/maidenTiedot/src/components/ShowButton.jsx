const ShowButton = ({setFilteredCountries, setSearch, country}) => {
    const handleShowClick = () => {
        setFilteredCountries([country])
        setSearch(country.name.common)
    }
    return (
        <button onClick={handleShowClick}>show</button>
    )
}

export default ShowButton;