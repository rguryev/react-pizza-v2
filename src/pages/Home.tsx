import qs from 'qs';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { items, status } = useSelector(selectPizzaData);
	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

	const onChangeCategory = (idx: number) => {
		dispatch(setCategoryId(idx));
	};

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	const getPizzas = async () => {
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? `asc` : `desc`;
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(
			// @ts-ignore
			fetchPizzas({ sortBy, order, category, search, currentPage }),
		);
	};

	//* 1st useEffect: generating url
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage]);

	//* 2nd useEffect: parsing url
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

			dispatch(setFilters({ ...params, sort }));

			isSearch.current = true;
		}
	}, []);

	//* 3rd useEffect: fetching pizzas
	React.useEffect(() => {
		window.scrollTo(0, 0);
		getPizzas();
		// if (!isSearch.current) {
		// 	getPizzas();
		// }

		isSearch.current = false;
	}, []);

	const pizzas = items.map((obj: any) => (
		<Link to={`pizza/${obj.id}`} key={obj.id}>
			<PizzaBlock {...obj} />
		</Link>
	));

	const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>?????? ??????????</h2>
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2>?????????????????? ???????????? ????</h2>
					<p>???? ?????????????? ???????????????? ??????????.</p>
				</div>
			) : (
				<div className='content__items'>{status === 'loading' ? skeletons : pizzas}</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;
