import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
    return axios.get(baseUrl);
};

const get = (name) => {
    return axios.get(`${baseUrl}/${name}`);
}

export default {getAll, get};