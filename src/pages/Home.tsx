import qs from 'qs';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
	FilterSliceState,
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { fetchPizzas, SearchPizzaParams, selectPizzaData } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';
import SortPopup from '../components/Sort';

const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { items, status } = useSelector(selectPizzaData);
	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

	const onChangeCategory = React.useCallback((idx: number) => {
		dispatch(setCategoryId(idx));
	}, []);

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	const getPizzas = async () => {
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? `asc` : `desc`;
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(fetchPizzas({ sortBy, order, category, search, currentPage: String(currentPage) }));

		window.scrollTo(0, 0);
	};

	//
	//
	//
	//
	//
	//
	//
	//
	// Если изменили параметры и был первый рендер
	// React.useEffect(() => {
	// 	if (isMounted.current) {
	// 		const params = {
	// 			categoryId: categoryId > 0 ? categoryId : null,
	// 			sortProperty: sort.sortProperty,
	// 			currentPage,
	// 		};
	// 		const queryString = qs.stringify(params, { skipNulls: true });
	// 		navigate(`/?${queryString}`);
	// 	}

	// 	if (!window.location.search) {
	// 		// указываем, что {} - не просто какой-то неизвестный объект, а объект с типом SearchPizzaParams и теперь знаем, что впредь ничего лишнего в нем не будет
	// 		dispatch(fetchPizzas({} as SearchPizzaParams));
	// 	}
	// }, [categoryId, sort.sortProperty, searchValue, currentPage]);

	React.useEffect(() => {
		getPizzas();
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	// // Парсим параметры при первом рендере
	// React.useEffect(() => {
	// 	if (window.location.search) {
	// 		// нам из url придет данные типа SearchPizzaParams (только строк)
	// 		const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
	// 		const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

	// 		// и мы должны передать в диспатч объект в редакс
	// 		dispatch(
	// 			setFilters({
	// 				// из url парсим params.search (строчки), но в редакс передаем searchValue (так, как говорит нам редакс)
	// 				searchValue: params.search,
	// 				categoryId: Number(params.category),
	// 				currentPage: Number(params.currentPage),
	// 				// если сортировка не нашлась, то мы берем первую сортировку из массива
	// 				sort: sort || sortList[0],
	// 			}),
	// 		);
	// 	}
	// 	isMounted.current = true;
	// }, []);

	const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<SortPopup value={sort} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2>Произошла ошибка 😕</h2>
					<p>Не удалось получить пиццы.</p>
				</div>
			) : (
				<div className='content__items'>{status === 'loading' ? skeletons : pizzas}</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;

//* 1st useEffect: generating url

// React.useEffect(() => {
// if (isMounted.current) {
// 	const params = {
// 		categoryId: categoryId > 0 ? categoryId : null,
// 		sortProperty: sort.sortProperty,
// 		currentPage,
// 	};
// 	const queryString = qs.stringify(params, { skipNulls: true });
// 	navigate(`/?${queryString}`);
// }

// const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
// const sortObj = sortList.find((obj) => obj.sortProperty === params.sortBy);

// dispatch(
// 	setFilters({
// 		searchValue: params.search,
// 		categoryId: Number(params.category),
// 		currentPage: Number(params.currentPage),
// 		sort: sortObj || sortList[0],
// 	}),
// );

// 	getPizzas();
// }, [categoryId, sort.sortProperty, searchValue, currentPage]);

//* 3rd useEffect: fetching pizzas
// React.useEffect(() => {
//   if (window.location.search) {
//     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
//     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
//     dispatch(
//       setFilters({
//         searchValue: params.search,
//         categoryId: Number(params.category),
//         currentPage: Number(params.currentPage),
//         sort: sort || sortList[0],
//       }),
//     );
//   }
//   isMounted.current = true;
// }, []);
