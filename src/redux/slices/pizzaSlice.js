import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// createSlice и createAsyncThunk - это 80% что будем делать в redux-toolkit
// Почему надо переносить логику получения пицц с сервера и сохранением их в стейт в бизнес логику: сегодня у нас логика получения пицц в home, а завтра может быть нужно и в другом месте, поэтому выделяем в отдельный файл чтобы не дублировать и использовать в любой части приложения.
// Функция createAsyncThunk позволяет создавать асинхронный экшен. Задаем имя по схеме sliceName/reducerName, передаем асинхронную функцию где будет уже какая-то логика
// Функция createAsyncThunk - т.е асинхронный экшен удобен когда нам надо сделать запрос на сервер + сделать какие-то манипуляции со стейтом в зависимости от статуса.
// в асинхронном экшене префикс 'pizza/fetchPizzasStatus' = fetchPizzas, а 'pizza/fetchPizzasStatus/pending' = fetchPizzas.pending, это нужно для того, чтобы понимать что он связан со слайсом pizza + объясняем через / что это действие fetchPizzasStatus + редакс прикрутит pending/fulfilled/rejected. Все это нужно для того, чтобы проще дебажить в браузере в расширении redux-toolkit
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async params => {
	// мы вытащили бизнес-логику получения пицц с сервера в отдельный асинхронный экшен и теперь эту логику можем использовать для для разных слайсов и для разных страниц
	// отправь запрос
	const { sortBy, order, category, search, currentPage } = params;
	const { data } = await axios.get(
		`https://63c5ae74f80fabd877ee1f3f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
	);
	// верни ответ
	return data;
});

const initialState = {
	items: [],
	status: 'loading', // loading | success | error
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	// в extraReducers передается какая-то логика, которая не относится к обычным методам, которые меняют стейт, а асинхронные экшены, специфические ключи и тд.
	extraReducers: {
		// выполни fetchPizzas, и если он выполнится успешно (fulfilled) - сделай что-то. Pending - отправка
		[fetchPizzas.pending]: state => {
			state.status = 'loading';
			// в момент загрузки новых пицц очищаем старые
			state.items = [];
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.status = 'success';
		},
		[fetchPizzas.rejected]: (state, action) => {
			state.status = 'error';
			// чтобы не вернулись пиццы со старого запроса - мы их очищаем
			state.items = [];
			console.log('error 500');
		},
	},
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
