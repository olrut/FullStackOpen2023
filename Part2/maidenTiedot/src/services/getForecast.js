import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = import.meta.env.VITE_SOME_KEY
const units = "metric";

const get = (lat, lon) => {
    return axios.get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`);
}

export default {get};