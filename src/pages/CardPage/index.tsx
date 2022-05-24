import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

import { getWeatherHours } from '../../Api/externalApi';
import { useAppDispatch, useAppSelector, useQuery } from '../../hooks/';
import { getDetailInfo, detailInfoInterface, initialDetailState } from '../../helpers/default';
import { getCurrentDate, getCurrentDay, getCurrentMonth, getCurrentTime } from '../../helpers/dateFunc';

import { cardState, getCard } from '../../redux/weatherDetailInfo';

const CardPage = () => {
	const dataCard = useAppSelector(cardState);
	const dispatch = useAppDispatch();

	const constDate = getCurrentDate(dataCard?.dt);
	const [hourlyWeather, setWeather] = useState<object[]>([]);

	const query = useQuery();

	useEffect(() => {
		if (dataCard || {}) {
			const name = query.get('name') || '';
			dispatch(getCard(name));
		}
	}, []);

	const dayOfWeek = constDate && getCurrentDay(constDate.getDay());
	const day = constDate && constDate.getDate();
	const month = constDate && getCurrentMonth(constDate.getMonth());

	const detailInfo: detailInfoInterface = dataCard ? getDetailInfo(dataCard) : initialDetailState;

	useEffect(() => {
		if (dataCard) {
			getWeatherHours(dataCard.coord.lat, dataCard.coord.lon)
				.then((res) => {
					setWeather(res.data.list);
				})
				.catch((err) => console.error(err));
		}
	}, [dataCard]);

	if (!dataCard || Object.keys(dataCard).length === 0) {
		return <p>Loading...</p>;
	}

	return (
		<>

			<Card className='text-left'>
				<CardContent className='detail-info'>
					<Typography>
						<span>Country: </span>
						{dataCard.sys ? dataCard.sys.country : ''}
					</Typography>
					<Typography><span>City: </span>{dataCard.name}</Typography>
					<Typography><span>Date: </span>{day + ' ' + month}</Typography>
					<Typography><span>Day of Week: </span>{dayOfWeek}</Typography>
					<Typography><span>Latitude: </span>{dataCard.coord.lat}</Typography>
					<Typography><span>Longitude: </span>{dataCard.coord.lon}</Typography>
					<Typography>
						<span>Temperature: </span>
						{detailInfo.temp ?
							<span>+{detailInfo.temp}</span> :
							<span>{detailInfo.temp}</span>}
						*
						<span> {detailInfo.descTemp}</span>
					</Typography>
					<Typography>
						<span>Temperature min: </span>
						{detailInfo.tempMin ?
							<span>+{detailInfo.tempMin}</span> :
							<span>{detailInfo.tempMin}</span>
						}*
					</Typography>
					<Typography>
						<span>Temperature max: </span>
						{detailInfo.tempMax ?
							<span>+{detailInfo.tempMax}</span> :
							<span>{detailInfo.tempMax}</span>
						}*
					</Typography>
					<Typography>
						<span>Feels like: </span>
						{detailInfo.tempFeels ?
							<span>+{detailInfo.tempFeels}</span> :
							<span>{detailInfo.tempFeels}</span>
						}*
					</Typography>
					<Typography><span>Wind speed: </span>{detailInfo.windSpeed}</Typography>
					<Typography><span>Wind gust: </span>{detailInfo.windGust}</Typography>
					<Typography><span>Wind deg: </span>{detailInfo.windDeg}</Typography>
					<Typography><span>Sunrise: </span>{detailInfo.sunrise}</Typography>
					<Typography><span>Sunset: </span>{detailInfo.sunset}</Typography>
					<Typography><span>Humidity: </span>{detailInfo.humidity}%</Typography>
					<Typography><span>Pressure: </span>{detailInfo.pressure}mm</Typography>
				</CardContent>
				<Typography style={{ marginLeft: '10px' }}>
					Weather every 3 hours during the day from the current time
				</Typography>
				<div className='hourly-weather'>
					{hourlyWeather.length &&
						hourlyWeather.map((elem: any) => {
							const num = Math.round(elem.main.temp - 273.15);
							return (

								<span
									style={{ transform: `translateY(calc(-50% - ${num * 2}px))` }}
									key={elem.dt}>
									{num ? '+' + num : num}
								</span>

							);
						})}
				</div>
			</Card>

		</>
	);
};

export default CardPage;
