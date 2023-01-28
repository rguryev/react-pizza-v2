import axios from 'axios';
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = () => {
	const { categoryId, sort, currentPage } = useSelector(state => state.filter);
	const dispatch = useDispatch();

	const { searchValue } = React.useContext(SearchContext);

	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const onChangeCategory = id => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = number => {
		dispatch(setCurrentPage(number));
	};

	React.useEffect(() => {
		try {
			setIsLoading(true);

			const sortBy = sort.sortProperty.replace('-', '');
			const order = sort.sortProperty.includes('-') ? `asc` : `desc`;
			const category = categoryId > 0 ? `category=${categoryId}` : '';
			const search = searchValue ? `&search=${searchValue}` : '';

			axios
				.get(
					`https://63c5ae74f80fabd877ee1f3f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
				)
				.then(res => {
					setItems(res.data);
					setIsLoading(false);
				});
			window.scrollTo(0, 0);
		} catch (error) {
			console.log(error);
		}
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />);

	const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;
