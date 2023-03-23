import { RootState } from '../store';

// state тут - это не cartSlice, это весь store приложения, поэтому нам надо типизировать его отдельно в store
export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
	state.cart.items.find((obj) => obj.id === id);
