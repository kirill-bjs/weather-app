import React, { useEffect, useState } from 'react';
import {
	Card,
	CardContent,
	CardActions,
	Typography,
	Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { getCurrentWeather } from '../../Api/externalApi';
import { useAppDispatch } from '../../hooks';
import { getCurrentDate, getCurrentDay, getCurrentMonth } from '../../helpers/dateFunc';

import { addDetailCard, CardInterface } from '../../redux/weatherDetailInfo';
import { deleteCard } from '../../redux/weatherCards';

interface cardProps {
	card: CardInterface
}

const CardComponent = ({ card }: cardProps) => {
	const [date, setDate] = useState<Date>();

	const history = useNavigate();
	const dispatch = useAppDispatch();

	const [refreshCard, setRefreshCard] = useState<CardInterface>();

	useEffect(() => {
		if (refreshCard) { setDate(getCurrentDate(refreshCard.dt)); };

		setDate(getCurrentDate(card.dt));
	}, [refreshCard]);

	const dayOfWeek = date && getCurrentDay(date.getDay());
	const day = date && date.getDate();
	const month = date && getCurrentMonth(date.getMonth());
	const tempMin = date && Math.round(card.main.temp_min - 273.15);
	const tempMax = date && Math.round(card.main.temp_max - 273.15);

	return (
		<Card className='text-center' variant='outlined' >
			<div className='btn-wrapper'>
				<Button
					className='refresh-btn'
					variant="contained"
					size="small"
					onClick={() => dispatch(deleteCard((card.id)))}
				>Delete</Button>
				<Button
					className='refresh-btn'
					variant="contained"
					size="small"
					onClick={() => {
						getCurrentWeather(card.name)
							.then((res) => {
								setRefreshCard(res.data);
							});
					}}
				>Refresh</Button>
			</div>
			{
				refreshCard ?
					<CardContent>

						<div>
							<span className='small-text'>refresh name</span>
							<Typography className='city-name'>
								{refreshCard.name}
							</Typography>
							<Typography className='day-week'>
								{dayOfWeek}
							</Typography>
							<Typography>
								<span className='standard-num '>{day}</span> {month}
							</Typography>
							<div className='temp-wrapper'>
								<Typography>
									<span className='small-text'>min</span><br />
									{tempMin ? <span>+{tempMin}*</span> : <span>tempMin*</span>}
								</Typography>
								<Typography>
									<span className='small-text'>max</span><br />
									{tempMin ? <span>+{tempMax}*</span> : <span>tempMax*</span>}
								</Typography>
							</div>
						</div>
					</CardContent> :
					<CardContent>
						<div>
							<span className='small-text'>old name</span>
							<Typography className='city-name'>
								{card.name}
							</Typography>
							<Typography className='day-week'>
								{dayOfWeek}
							</Typography>
							<Typography>
								<span className='standard-num '>{day}</span> {month}
							</Typography>
							<div className='temp-wrapper'>
								<Typography>
									<span className='small-text'>min</span><br />
									{tempMin ? <span>+{tempMin}*</span> : <span>tempMin*</span>}
								</Typography>
								<Typography>
									<span className='small-text'>max</span><br />
									{tempMin ? <span>+{tempMin}*</span> : <span>tempMin*</span>}
								</Typography>
							</div>
						</div>
					</CardContent>
			}
			<CardActions style={{ justifyContent: 'center' }}>
				<Button size="small" onClick={(e) => {
					dispatch(addDetailCard(card));
					history(`/card/?name=${card.name}`);
				}}>Learn More</Button>
			</CardActions>
		</ Card >
	);
};

export default CardComponent;
