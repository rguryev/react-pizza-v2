import React from 'react';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = ({ searchValue }) => {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [categoryId, setCategoryId] = React.useState(0);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });

	console.log(currentPage);

	React.useEffect(() => {
		try {
			setIsLoading(true);

			const sortBy = sortType.sortProperty.replace('-', '');
			const order = sortType.sortProperty.includes('-') ? `asc` : `desc`;
			const category = categoryId > 0 ? `category=${categoryId}` : '';
			const search = searchValue ? `&search=${searchValue}` : '';

			fetch(
				`https://63c5ae74f80fabd877ee1f3f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
			)
				.then(res => res.json())
				.then(json => {
					setItems(json);
					setIsLoading(false);
				});
			window.scrollTo(0, 0);
		} catch (error) {
			console.log(error);
		}
	}, [categoryId, sortType, searchValue, currentPage]);

	const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />);

	const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={i => setCategoryId(i)} />
				<Sort value={sortType} onChangeSort={i => setSortType(i)} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination onChangePage={number => setCurrentPage(number)} />
		</div>
	);
};

export default Home;
