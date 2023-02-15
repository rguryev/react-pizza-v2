import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
	const { sortBy, order, category, search, currentPage } = params;
	const { data } = await axios.get(
		`https://63c5ae74f80fabd877ee1f3f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
	);
	return data;
});

const initialState = {
	items: [],
	status: 'loading',
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},

	extraReducers: {
		[fetchPizzas.pending]: (state) => {
			state.status = 'loading';
			// в момент загрузки новых пицц очищаем старые
			state.items = [];
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.status = 'success';
		},
		[fetchPizzas.rejected]: (state) => {
			state.status = 'error';
			// чтобы не вернулись пиццы со старого запроса - мы их очищаем
			state.items = [];
			console.log('error 500');
		},
	},
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
