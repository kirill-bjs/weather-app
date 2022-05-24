import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cardsListSlice from './weatherCards';
import cardSlice from './weatherDetailInfo';

export const store = configureStore({
	reducer: {
		cards: cardsListSlice,
		card: cardSlice
	}
});

store.subscribe(() => {
	window.localStorage.setItem('cardsLocalStorage', JSON.stringify(store.getState().cards.cards));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
