import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
	},
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			console.log('action setCategoryId: ', action);

			state.categoryId = action.payload;
		},
		setSortId(state, action) {
			state.sort = action.payload;
		},
	},
});

export const { setCategoryId, setSortId } = filterSlice.actions;
export default filterSlice.reducer;
