import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchPizzas } from './asyncActions';
import { Pizza, PizzaSliceState, Status } from './types';

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload;
		},
	},

	// типизация extraReducers
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state, action) => {
			state.status = Status.LOADING;
			state.items = [];
		});

		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});

		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = Status.ERROR;
			state.items = [];
			console.log('error 500');
		});
	},

	// extraReducers: {
	// 	[fetchPizzas.pending]: (state) => {
	// 		state.status = 'loading';
	// 		в момент загрузки новых пицц очищаем старые
	// 		state.items = [];
	// 	},
	// 	[fetchPizzas.fulfilled]: (state, action) => {
	// 		state.items = action.payload;
	// 		state.status = 'success';
	// 	},
	// 	[fetchPizzas.rejected]: (state) => {
	// 		state.status = 'error';
	// 		чтобы не вернулись пиццы со старого запроса - мы их очищаем
	// 		state.items = [];
	// 		console.log('error 500');
	// 	},
	// },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
