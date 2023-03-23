// типизация всех свойств объекта одинаково {строка: строка}
// type FetchPizzasArgs = Record<string, string>;

export type Pizza = {
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

export interface PizzaSliceState {
	items: Pizza[];
	status: Status;
}

export type SearchPizzaParams = {
	sortBy: string;
	order: string;
	category: string;
	search: string;
	currentPage: string;
};