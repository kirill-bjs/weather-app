import { RootState } from './store';

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentWeather } from '../Api/externalApi';

export interface CardInterface {
	id: number,
	dt: number,
	name: string,
	coord: {
		lat: number,
		lon: number
	}
	weather: [
		{
			description: string
		}
	],
	main: {
		temp: number,
		temp_max: number,
		temp_min: number,
		feels_like: number
		humidity: number,
		pressure: number
	},
	sys: {
		sunrise: number,
		sunset: number,
		country: string
	},
	wind: {
		speed: number,
		deg: number,
		gust: number
	},
}

export interface CardState {
	card: CardInterface | null;
	status: 'idle' | 'loading' | 'failed';
};

const initialState: CardState = {
	card: null,
	status: 'idle'
};

export const cardSlice = createSlice({
	name: 'card',
	initialState,
	reducers: {
		addDetailCard: (state, action: PayloadAction<CardInterface>) => {
			state.card = action.payload;
		}
	}
});

export const { addDetailCard } = cardSlice.actions;

export const cardState = (state: RootState) => state.card.card;

export const getCard = createAsyncThunk(
	'cards/deleteCard',
	async (cityName: string, thunkAPI) => {
		getCurrentWeather(cityName)
			.then((res) => thunkAPI.dispatch(addDetailCard(res.data)))
			.catch((err) => console.log(err));
	}
);

export default cardSlice.reducer;
