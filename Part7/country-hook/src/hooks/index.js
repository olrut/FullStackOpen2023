import {useEffect, useState} from 'react'
import axios from 'axios'

export const useCountry = () => {
    const [name, setName] = useState('')
    const [data, setData] = useState(null)
    const [found, setFound] = useState(false)

    useEffect(() => {
        if (name === '') {
            return
        }

        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
            .then(response => {
                setData(response.data)
                setFound(true)
            })
            .catch(error => {
                setData(null)
                setFound(false)
            })
    }, [name, setName])

    const setCountry = (value) => {
        setName(value.toLowerCase())
    }


    return {
        setCountry,
        data,
        name,
        found
    }
}