import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import { useAppDispatch } from './hooks';
import { appRoutesArray } from './helpers/default';

import { addCardFromLocalStorage, getCardList } from './redux/weatherCards';

import './App.css';

const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const savedState = JSON.parse(localStorage.getItem('cardsLocalStorage') || '[]	');
		if (!savedState.length) {
			dispatch(getCardList('London'));
		} else {
			dispatch(addCardFromLocalStorage(savedState));
		}
	}, []);

	return (
		<Container maxWidth="xl">
			<div className="App">
				<Routes>
					{appRoutesArray.map((route) => {
						const Component = route.component;

						return <Route path={route.link} key={route.link} element={
							<Component />
						} />;
					})}
				</Routes>
			</div>
		</Container>
	);
};

export default App;
