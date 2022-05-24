import axios from 'axios';
import { API_URL, API_KEY } from '../helpers/service';

export const externalApi = axios.create({
	baseURL: API_URL
});

export const getCurrentWeather = (cityName: string) =>
	externalApi.get(`/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);

export const getWeatherHours = (lat: number, lon: number) =>
	externalApi.get(`/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=8&appid=${API_KEY}`);

