import axios from 'axios'
import { useState, useEffect } from 'react'

export const useResource = baseUrl => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        axios
            .get(baseUrl)
            .then(response => {
                setResources(response.data)
            })
    }, [baseUrl])

    const create = async (resource) => {
        try {
            const response = await axios.post(baseUrl, resource)
            setResources(resources.concat(response.data))
        }
        catch (error) {
            console.error(error)
        }
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}