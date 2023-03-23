import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Sort } from './filterSlice';

// типизация всех свойств объекта одинаково {строка: строка}
// type FetchPizzasArgs = Record<string, string>;

type Pizza = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
};

// ключ в enum-объекте принято писать в верхнем регистре
export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface PizzaSliceState {
	items: Pizza[];
	status: Status;
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
};

export type SearchPizzaParams = {
	sortBy: string;
	order: string;
	category: string;
	search: string;
	currentPage: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const { sortBy, order, category, search, currentPage } = params;
		const { data } = await axios.get<Pizza[]>(
			`https://63c5ae74f80fabd877ee1f3f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
		);
		// типизация ответа, мы получаем объект, поэтому так и пишем, data as CartItem[] (будет как массив CartItem-ов)
		return data;
	},
);

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

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
