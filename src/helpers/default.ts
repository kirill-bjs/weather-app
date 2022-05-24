import HomePage from '../pages/HomePage';
import CardPage from '../pages/CardPage';

import { getCurrentTime } from './dateFunc';
import { CardInterface } from '../redux/weatherDetailInfo';

export const appRoutes = {
	home: '/',
	cards: '/card'
};

export const appRoutesArray = [
	{
		link: appRoutes.home,
		component: HomePage
	},
	{
		link: appRoutes.cards,
		component: CardPage
	}
];

export interface detailInfoInterface {
	descTemp: string | false
	temp: number | false
	tempMin: number | false
	tempMax: number | false
	tempFeels: number | false
	sunrise: string | false
	sunset: string | false
	humidity: number | false
	pressure: number | false
	windSpeed: number | false
	windDeg: number | false
	windGust: number | false
}

export const initialDetailState = {
	descTemp: '',
	temp: 0,
	tempMin: 0,
	tempMax: 0,
	tempFeels: 0,
	sunrise: '',
	sunset: '',
	humidity: 0,
	pressure: 0,
	windSpeed: 0,
	windDeg: 0,
	windGust: 0
};

export const getDetailInfo = (card: CardInterface) => {
	if (Object.keys(card).length !== 0) {
		const descTemp = card.weather[0].description;
		const temp = Math.round(card.main.temp - 273.15);
		const tempMin = Math.round(card.main.temp_min - 273.15);
		const tempMax = Math.round(card.main.temp_max - 273.15);
		const tempFeels = Math.round(card.main.feels_like - 273.15);

		const sunrise = getCurrentTime(card.sys.sunrise);
		const sunset = getCurrentTime(card.sys.sunset);

		const humidity = card.main.humidity;
		const pressure = card.main.pressure;

		const windSpeed = card.wind.speed;
		const windDeg = card.wind.deg;
		const windGust = card.wind.gust;

		return {
			descTemp,
			temp,
			tempMin,
			tempMax,
			tempFeels,
			sunrise,
			sunset,
			humidity,
			pressure,
			windSpeed,
			windDeg,
			windGust
		};
	} else {
		return initialDetailState;
	}
};
