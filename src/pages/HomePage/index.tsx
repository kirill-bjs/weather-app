import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../hooks';

import CardComponent from '../../components/Card';

import {
	selectCard,
	setErrorMessage,
	errorMessage,
	getCardList
} from '../../redux/weatherCards';
import { CardInterface } from '../../redux/weatherDetailInfo';

const HomePage = () => {
	const cards = useAppSelector(selectCard);
	const message = useAppSelector(errorMessage);

	const dispatch = useAppDispatch();

	const [cityName, setCityName] = useState('');

	const handlerAddCard = (cityName: string, errorMessage: string) => {
		dispatch(setErrorMessage(errorMessage));
		dispatch(getCardList(cityName));
	};

	const handlerBtnAddCard = () => {
		if (cityName) {
			handlerAddCard(cityName, '');
		} else {
			dispatch(setErrorMessage('Ввидите название города'));
		}
	};

	const handlerKeyUpAddCard = (e: { code: string }) => {
		if (e.code === 'Enter' && cityName) {
			handlerAddCard(cityName, '');
		} else if (!cityName && e.code === 'Enter') {
			dispatch(setErrorMessage('Ввидите название города'));
		}
	};

	return (
		<>
			<Typography>Weather App</Typography>
			<Grid container spacing={0}>

				<Grid item className="text-left d-flex">
					<span className='error-message'>{message}</span>
					<TextField
						id="outlined-basic"
						label="Search"
						variant="outlined"
						value={cityName}
						onChange={(e) => setCityName(e.target.value)}
						onKeyUp={(e) => handlerKeyUpAddCard(e)}
					/>
					<Button
						variant="contained"
						onClick={() => handlerBtnAddCard()}
					>
						addCard
					</Button>

				</Grid>
			</Grid>
			<Grid container spacing={0}>
				<Grid item lg={12} className="text-left">
					<Typography>Card</Typography>
					<Grid container spacing={2}>
						{cards ?
							cards.map((card: CardInterface) => (
								<Grid key={card.id} item lg={2} >
									<CardComponent card={card} />
								</Grid>
							)) :
							<Typography>Loading...</Typography>
						}
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default HomePage;
