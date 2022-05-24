import { RootState } from './store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getCurrentWeather } from '../Api/externalApi';

import { CardInterface } from './weatherDetailInfo';

export interface CardsState {
	cards: CardInterface[];
	status: 'idle' | 'loading' | 'failed';
	error: string,
}

const initialState: CardsState = {
	cards: [],
	status: 'idle',
	error: ''
};

export const cardsListSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		addCardFromLocalStorage: (state, action: PayloadAction<CardInterface[]>) => {
			state.cards = action.payload;
		},
		addCard: (state, action: PayloadAction<CardInterface>) => {
			state.cards  = [...state.cards, action.payload];
		},
		removeCard: (state, action: PayloadAction<CardInterface[]>) => {
			state.cards = action.payload;
		},
		setErrorMessage: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		}
	}
});

export const { addCard, removeCard, addCardFromLocalStorage, setErrorMessage } = cardsListSlice.actions;

export const selectCard = (state: RootState) => state.cards.cards;
export const errorMessage = (state: RootState) => state.cards.error;

export const getCardList = createAsyncThunk(
	'cards/setCards',
	async (cityName: string, thunkAPI) => {
		getCurrentWeather(cityName)
			.then((res) => {
				const { cards } = thunkAPI.getState() as { cards: CardsState };
				const checkCard = cards.cards.find((card: CardInterface) => card.id === res.data.id);
				if (!checkCard) {
					thunkAPI.dispatch(addCard(res.data));
				}
			})
			.catch((err) => {
				thunkAPI.dispatch(setErrorMessage(err.response.data.message));
			});
	}
);

export const deleteCard = createAsyncThunk(
	'cards/deleteCard',
	async (id: number, thunkAPI) => {
		const { cards } = thunkAPI.getState() as { cards: CardsState };
		const checkCard = cards.cards.find((card: CardInterface) => card.id === id);
		const newCards = cards.cards.filter((card: CardInterface) => card.id !== id);
		if (checkCard) {
			thunkAPI.dispatch(removeCard(newCards));
		}
	}
);

export default cardsListSlice.reducer;
